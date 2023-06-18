import type { UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import {
  AccountRecovery,
  UserPool,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import { generateConstructNameLiteral } from '../utils/generate-construct-names';

type CognitoConstructOptions<T extends string> = ConstructDefaultTypes<T>;

function generateCognitoCNameLiteral<StackName extends string>(
  stackName: StackName
): Lowercase<DashJoined<StackName, 'cognito-pool'>> {
  return generateConstructNameLiteral(stackName, 'cognito-pool');
}

class CognitoConstruct<StackName extends string> extends Construct {
  private readonly scope: Construct;

  private _userPool?: UserPool;
  private _userPoolClient?: UserPoolClient;
  private readonly name: Lowercase<DashJoined<StackName, 'cognito-pool'>>;
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
    { stackName, prod }: CognitoConstructOptions<StackName>
  ) {
    super(scope, stackName);
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = generateCognitoCNameLiteral(stackName);
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
    const userPoolClientName = generateConstructNameLiteral(
      this.name,
      'client'
    );
    this._userPoolClient = this.userPool.addClient(userPoolClientName, {
      userPoolClientName,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });
  }
}

export { CognitoConstruct, generateCognitoCNameLiteral };
export type { CognitoConstructOptions };
