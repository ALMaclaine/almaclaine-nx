import { Construct } from 'constructs';
import type { ConstructDefaultTypes, ConstructNameLiteral } from '../types';
import { CfnAccessKey, User } from 'aws-cdk-lib/aws-iam';
import { generateUserName } from '../utils/generate-construct-names';
import { Tags } from '../utils/tags';
import { CfnOutput } from './cfn-output';
import type {
  CfnUserArnType,
  CfnUserNameType,
  CfnVercelServerUserAccessKeyIdType,
  CfnVercelServerUserSecretAccessKeyIdType,
} from '../utils/cfn-outputs/cfn-outputs-user';

type UserOutputNames = {
  userOutputName?: CfnUserNameType;
  userArn?: CfnUserArnType;
  accessKeyId?: CfnVercelServerUserAccessKeyIdType;
  secretAccessKey?: CfnVercelServerUserSecretAccessKeyIdType;
};

type UserConstructOptions<
  StackName extends string,
  UserName extends CfnUserNameType
> = ConstructDefaultTypes<StackName> & {
  userName: UserName;
  createAccessKey?: boolean;
  outputNames?: UserOutputNames;
};

class UserConstruct<
  StackName extends string,
  UserName extends CfnUserNameType
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
    this.name = generateUserName(stackName, userName);
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

  static of<StackName extends string, UserName extends CfnUserNameType>(
    scope: Construct,
    props: UserConstructOptions<StackName, UserName>
  ) {
    return new UserConstruct(scope, props);
  }

  createOutputName(scope: Construct, userName: CfnUserNameType) {
    CfnOutput.createOutput(scope, {
      value: this.user.userName,
      name: userName,
    });
  }

  createOutputArn(scope: Construct, userArn: CfnUserArnType) {
    CfnOutput.createOutput(scope, {
      value: this.user.userArn,
      name: userArn,
    });
  }

  createOutputAccessKey(
    scope: Construct,
    userAccessKey: CfnVercelServerUserAccessKeyIdType
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
    userSecretKeyName: CfnVercelServerUserSecretAccessKeyIdType
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
