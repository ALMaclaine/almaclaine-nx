import type { UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import {
  AccountRecovery,
  UserPool,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { ConstructDefaultTypes, ConstructNameLiteral } from '../types';
import { Tags } from '../utils/tags';
import {
  ConstructNameGenerator,
  ConstructEnum,
} from './utils/generate-construct-names';

type CognitoConstructOptions<
  StackName extends string,
  UserPoolName extends string
> = ConstructDefaultTypes<StackName> & {
  userPoolName: UserPoolName;
};

class CognitoConstruct<
  StackName extends string,
  UserPoolName extends string
> extends Construct {
  private readonly scope: Construct;

  private _userPool?: UserPool;
  private _userPoolClient?: UserPoolClient;
  private readonly name: ConstructNameLiteral<
    StackName,
    UserPoolName,
    'cognito-pool'
  >;
  private readonly prod: boolean;

  get userPoolClient(): UserPoolClient {
    if (!this._userPoolClient) {
      throw Error('UserPoolClient not initialized');
    }

    return this._userPoolClient;
  }

  get userPool(): UserPool {
    if (!this._userPool) {
      throw Error('UserPool not initialized');
    }

    return this._userPool;
  }

  constructor(
    scope: Construct,
    {
      stackName,
      userPoolName,
    }: CognitoConstructOptions<StackName, UserPoolName>
  ) {
    super(scope, stackName);
    this.prod = Tags.isProd(scope);
    this.scope = scope;

    const cng = ConstructNameGenerator.of(stackName);
    this.name = cng.generateConstructName(
      userPoolName,
      ConstructEnum.COGNITO_POOL
    );
    this.initialize();
  }

  private initialize() {
    this.createUserPool();
    this.createUserPoolClient();
  }

  private createUserPool() {
    this._userPool = new UserPool(this.scope, this.name, {
      userPoolName: this.name,
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: false,
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: 'You need to verify your email',
        emailBody: 'Thanks for signing up Your verification code is {####}', // # This placeholder is a must if code is selected as preferred verification method
        emailStyle: VerificationEmailStyle.CODE,
      },
      keepOriginal: {
        email: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      removalPolicy: this.prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    });
  }

  private createUserPoolClient() {
    const userPoolClientName = `${this.name}-client` as const;
    this._userPoolClient = this.userPool.addClient(userPoolClientName, {
      userPoolClientName,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });
  }

  static of<StackName extends string, UserPoolName extends string>(
    scope: Construct,
    options: CognitoConstructOptions<StackName, UserPoolName>
  ) {
    return new CognitoConstruct(scope, options);
  }
}

export { CognitoConstruct };
export type { CognitoConstructOptions };
