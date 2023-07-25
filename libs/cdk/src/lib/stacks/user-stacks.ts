import type { Stack } from '../stack';
import type { UserConstructOptions } from '../constructs/user.construct';
import { UserConstruct } from '../constructs/user.construct';
import { merge } from 'moderndash';
import type { CfnOutputNameGenerator } from '../utils/cfn-outputs/cfn-output-name-generator';

type CreateUserStackOptions<
  StackName extends string,
  UserName extends ReturnType<typeof CfnOutputNameGenerator.userName>
> = Omit<UserConstructOptions<StackName, UserName>, 'stackName'>;

function createUserStack<
  StackName extends string,
  UserName extends ReturnType<typeof CfnOutputNameGenerator.userName>
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
