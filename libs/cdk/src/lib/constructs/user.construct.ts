import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import { User } from 'aws-cdk-lib/aws-iam';
import {
  generateConstructName,
  generateConstructNameLiteral,
} from '../utils/generate-construct-names';

type UserConstructOptions<
  ConstructName extends string,
  UserName extends string
> = ConstructDefaultTypes<ConstructName> & {
  userName: UserName;
};

function generateUserName(stackName: string, userName: string): string {
  return generateConstructName(stackName, 'user', userName);
}

function generateUserNameLiteral<
  ConstructName extends string,
  UserName extends string
>(
  constructName: ConstructName,
  userName: UserName
): Lowercase<DashJoined<ConstructName, `user-${UserName}`>> {
  const a = generateConstructNameLiteral(constructName, 'user');
  return generateConstructNameLiteral(a, userName);
}

class UserConstruct<
  ConstructName extends string,
  UserName extends string
> extends Construct {
  private readonly scope: Construct;

  private _user?: User;

  private readonly name: Lowercase<
    DashJoined<ConstructName, `user-${UserName}`>
  >;
  private readonly prod: boolean;

  get user(): User {
    if (!this._user) {
      throw Error('User not initialized');
    }

    return this._user;
  }

  constructor(
    scope: Construct,
    options: UserConstructOptions<ConstructName, UserName>
  ) {
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
