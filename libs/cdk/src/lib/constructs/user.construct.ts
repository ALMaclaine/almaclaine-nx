import { Construct } from 'constructs';
import type { ConstructDefaultTypes, ConstructNameLiteral } from '../types';
import { User } from 'aws-cdk-lib/aws-iam';
import { generateUserName } from '../utils/generate-construct-names';

type UserConstructOptions<
  StackName extends string,
  UserName extends string
> = ConstructDefaultTypes<StackName> & {
  userName: UserName;
};

class UserConstruct<
  StackName extends string,
  UserName extends string
> extends Construct {
  private readonly scope: Construct;

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

export { UserConstruct };
export type { UserConstructOptions };
