import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import { User } from 'aws-cdk-lib/aws-iam';
import { generateConstructNameLiteral } from '../utils/generate-construct-names';

type UserConstructOptions<
  StackName extends string,
  UserName extends string
> = ConstructDefaultTypes<StackName> & {
  userName: UserName;
};

function generateUserNameLiteral<
  StackName extends string,
  UserName extends string
>(
  stackName: StackName,
  userName: UserName
): Lowercase<DashJoined<StackName, `user-${UserName}`>> {
  const a = generateConstructNameLiteral(stackName, 'user');
  return generateConstructNameLiteral(a, userName);
}

class UserConstruct<
  StackName extends string,
  UserName extends string
> extends Construct {
  private readonly scope: Construct;

  private _user?: User;

  private readonly name: Lowercase<DashJoined<StackName, `user-${UserName}`>>;
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
    const { stackName, userName } = options || {};
    super(scope, stackName);
    this.prod = options?.prod ?? false;
    this.scope = scope;
    this.name = generateUserNameLiteral(stackName, userName);
    this.initialize();
  }

  private initialize() {
    this.createUser();
  }

  private createUser() {
    this._user = new User(this.scope, this.name);
  }
}

export { UserConstruct, generateUserNameLiteral };
export type { UserConstructOptions };
