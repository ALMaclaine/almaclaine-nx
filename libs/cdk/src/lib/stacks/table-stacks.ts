import type { Stack } from '../stack';
import type { TableConstructOptions } from '../constructs/table.construct';
import { TableConstruct } from '../constructs/table.construct';
import { getVercelUser } from '../utils/get-user';
import type { CfnVercelServerUserArnType } from '../utils/cfn-outputs/cfn-outputs-user';
import { merge } from 'moderndash';

function createTableStack<StackName extends string, TableName extends string>(
  stack: Stack,
  props: Omit<TableConstructOptions<StackName, TableName>, 'stackName'>
) {
  TableConstruct.of(stack.stack, merge(props, { stackName: stack.name }));
}

type CreateVercelTableStackProps<
  StackName extends string,
  TableName extends string
> = Omit<TableConstructOptions<StackName, TableName>, 'stackName'> & {
  vercelUserArn: CfnVercelServerUserArnType;
};

function createVercelTableStack<
  StackName extends string,
  TableName extends string
>(stack: Stack, props: CreateVercelTableStackProps<StackName, TableName>) {
  createTableStack(
    stack,
    merge(props, {
      grants: {
        readWrite: [getVercelUser(stack.stack, props.vercelUserArn)],
      },
    })
  );
}

export type { CreateVercelTableStackProps };
export { createTableStack, createVercelTableStack };
