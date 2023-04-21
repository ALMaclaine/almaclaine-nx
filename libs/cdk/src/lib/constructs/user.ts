import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../types';
import { User } from 'aws-cdk-lib/aws-iam';
import { generateConstructName } from '../utils/generate-construct-names';

type UserConstructOptions = ConstructDefaultTypes & {
  userName: string;
};

function generateUserName(stackName: string, userName: string): string {
  return generateConstructName(stackName, 'user', userName);
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
    const { name, userName } = options || {};
    super(scope, name);
    this.prod = options?.prod ?? false;
    this.scope = scope;
    this.name = generateUserName(name, userName);
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
