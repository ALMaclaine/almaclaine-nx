import { Construct } from 'constructs';
import type { ConstructDefaultTypes, ConstructNameLiteral } from '../types';
import { CfnAccessKey, User } from 'aws-cdk-lib/aws-iam';
import { Tags } from '../utils/tags';
import { CfnOutput } from './cfn-output';
import {
  ConstructEnum,
  ConstructNameGenerator,
} from './utils/generate-construct-names';
import type { CfnOutputNameGenerator } from '../utils/cfn-outputs/cfn-output-name-generator';

type UserOutputNames = {
  userOutputName?: ReturnType<typeof CfnOutputNameGenerator.userName>;
  userArn?: ReturnType<typeof CfnOutputNameGenerator.userArn>;
  accessKeyId?: ReturnType<typeof CfnOutputNameGenerator.userAccessKeyId>;
  secretAccessKey?: ReturnType<
    typeof CfnOutputNameGenerator.userSecretAccessKeyId
  >;
};

type UserConstructOptions<
  StackName extends string,
  UserName extends ReturnType<typeof CfnOutputNameGenerator.userName>
> = ConstructDefaultTypes<StackName> & {
  userName: UserName;
  createAccessKey?: boolean;
  outputNames?: UserOutputNames;
};

class UserConstruct<
  StackName extends string,
  UserName extends ReturnType<typeof CfnOutputNameGenerator.userName>
> extends Construct {
  private readonly scope: Construct;

  private readonly accessKey?: CfnAccessKey;
  private _user?: User;

  private readonly name: ConstructNameLiteral<StackName, UserName, 'user'>;
  private readonly prod: boolean;

  get user(): User {
    if (!this._user) {
      throw Error('User not initialized');
    }

    return this._user;
  }

  constructor(
    scope: Construct,
    options: UserConstructOptions<StackName, UserName>
  ) {
    const { stackName, userName, createAccessKey, outputNames } = options || {};
    super(scope, stackName);
    this.prod = Tags.isProd(scope);
    this.scope = scope;

    const cng = ConstructNameGenerator.of(stackName);
    this.name = cng.generateConstructName(userName, ConstructEnum.USER);
    this.createUser();
    if (createAccessKey) {
      this.accessKey = new CfnAccessKey(this.scope, 'CfnAccessKey', {
        userName: this.user.userName,
      });
    }

    outputNames && this.handleOutputNames(scope, outputNames);
  }

  private handleOutputNames(scope: Construct, outputNames: UserOutputNames) {
    const { userOutputName, userArn, accessKeyId, secretAccessKey } =
      outputNames || {};

    userOutputName && this.createOutputName(scope, userOutputName);
    userArn && this.createOutputArn(scope, userArn);
    accessKeyId && this.createOutputAccessKey(scope, accessKeyId);
    secretAccessKey && this.createOutputSecretKey(scope, secretAccessKey);
  }

  private createUser() {
    this._user = new User(this.scope, this.name);
  }

  static of<
    StackName extends string,
    UserName extends ReturnType<typeof CfnOutputNameGenerator.userName>
  >(scope: Construct, props: UserConstructOptions<StackName, UserName>) {
    return new UserConstruct(scope, props);
  }

  createOutputName(
    scope: Construct,
    userName: ReturnType<typeof CfnOutputNameGenerator.userName>
  ) {
    CfnOutput.createOutput(scope, {
      value: this.user.userName,
      name: userName,
    });
  }

  createOutputArn(
    scope: Construct,
    userArn: ReturnType<typeof CfnOutputNameGenerator.userArn>
  ) {
    CfnOutput.createOutput(scope, {
      value: this.user.userArn,
      name: userArn,
    });
  }

  createOutputAccessKey(
    scope: Construct,
    userAccessKey: ReturnType<typeof CfnOutputNameGenerator.userAccessKeyId>
  ) {
    if (!this.accessKey) {
      throw Error(
        'Access key not initialized, pass accessKey true to constructor'
      );
    }

    CfnOutput.of(scope, {
      value: this.accessKey.ref,
      name: userAccessKey,
    });
  }

  createOutputSecretKey(
    scope: Construct,
    userSecretKeyName: ReturnType<
      typeof CfnOutputNameGenerator.userSecretAccessKeyId
    >
  ) {
    if (!this.accessKey) {
      throw Error(
        'Access key not initialized, pass accessKey true to constructor'
      );
    }

    CfnOutput.of(scope, {
      value: this.accessKey.attrSecretAccessKey,
      name: userSecretKeyName,
    });
  }
}

export { UserConstruct };
export type { UserConstructOptions };
