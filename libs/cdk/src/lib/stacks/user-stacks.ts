import type { Stack } from '../stack';
import type { UserConstructOptions } from '../constructs/user.construct';
import type { CfnUserNameType } from '../utils/cfn-outputs/cfn-outputs-user';
import { UserConstruct } from '../constructs/user.construct';
import { merge } from 'moderndash';

type CreateUserStackOptions<
  StackName extends string,
  UserName extends CfnUserNameType
> = Omit<UserConstructOptions<StackName, UserName>, 'stackName'>;

function createUserStack<
  StackName extends string,
  UserName extends CfnUserNameType
>(stack: Stack, props: CreateUserStackOptions<StackName, UserName>) {
  UserConstruct.of(
    stack.stack,
    merge(props, {
      stackName: stack.name,
    })
  );
}

export { createUserStack };
export type { CreateUserStackOptions };
