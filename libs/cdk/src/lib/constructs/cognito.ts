import type { UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import {
  AccountRecovery,
  UserPool,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../types';

type CognitoConstructOptions = ConstructDefaultTypes;

class CognitoConstruct extends Construct {
  private readonly scope: Construct;

  private _userPool?: UserPool;
  private _userPoolClient?: UserPoolClient;
  private readonly name: string;
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
    name: string,
    options?: CognitoConstructOptions
  ) {
    super(scope, name);
    this.prod = options?.prod ?? false;
    this.scope = scope;
    this.name = `${name}-cognito-pool`;
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
    this._userPoolClient = this.userPool.addClient(`${this.name}-client`, {
      userPoolClientName: `${this.name}-client`,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });
  }
}

export { CognitoConstruct };
export type { CognitoConstructOptions };
