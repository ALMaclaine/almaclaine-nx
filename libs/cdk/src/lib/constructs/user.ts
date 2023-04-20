import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../types';
import { User } from 'aws-cdk-lib/aws-iam';

type UserConstructOptions = ConstructDefaultTypes & {
  stackName: string;
  userName: string;
};

function generateUserName(stackName: string, userName: string): string {
  return `${stackName}-user-${userName}`;
}

class UserConstruct extends Construct {
  private readonly scope: Construct;

  private _user?: User;

  private readonly name: string;
  private readonly prod: boolean;

  get user(): User {
    if (!this._user) {
      throw Error('User not initialized');
    }

    return this._user;
  }

  constructor(scope: Construct, options: UserConstructOptions) {
    const { stackName, userName } = options || {};
    super(scope, stackName);
    this.prod = options?.prod ?? false;
    this.scope = scope;
    this.name = generateUserName(stackName, userName);
    this.initialize();
  }

  private initialize() {
    this.createUser();
  }

  private createUser() {
    this._user = new User(this.scope, this.name);
  }
}

export { UserConstruct, generateUserName };
export type { UserConstructOptions };
