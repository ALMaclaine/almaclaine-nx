import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import { User } from 'aws-cdk-lib/aws-iam';
import {
  generateConstructName,
  generateConstructNameLiteral,
} from '../utils/generate-construct-names';

type UserConstructOptions<
  T extends string,
  K extends string
> = ConstructDefaultTypes<T> & {
  userName: K;
};

function generateUserName(stackName: string, userName: string): string {
  return generateConstructName(stackName, 'user', userName);
}

function generateUserNameLiteral<T extends string, K extends string>(
  stackName: T,
  userName: K
): Lowercase<DashJoined<T, `user-${K}`>> {
  const a = generateConstructNameLiteral(stackName, 'user');
  return generateConstructNameLiteral(a, userName);
}

class UserConstruct<T extends string, K extends string> extends Construct {
  private readonly scope: Construct;

  private _user?: User;

  private readonly name: Lowercase<DashJoined<T, `user-${K}`>>;
  private readonly prod: boolean;

  get user(): User {
    if (!this._user) {
      throw Error('User not initialized');
    }

    return this._user;
  }

  constructor(scope: Construct, options: UserConstructOptions<T, K>) {
    const { name, userName } = options || {};
    super(scope, name);
    this.prod = options?.prod ?? false;
    this.scope = scope;
    this.name = generateUserNameLiteral(name, userName);
    this.initialize();
  }

  private initialize() {
    this.createUser();
  }

  private createUser() {
    this._user = new User(this.scope, this.name);
  }
}

export { UserConstruct, generateUserName, generateUserNameLiteral };
export type { UserConstructOptions };
