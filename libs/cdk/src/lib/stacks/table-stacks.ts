import type { Stack } from '../stack';
import type { TableConstructOptions } from '../constructs/table.construct';
import { TableConstruct } from '../constructs/table.construct';
import { getVercelUser } from '../utils/get-user';
import type { CfnVercelServerUserArn } from '../utils/cfn-outputs/cfn-outputs-user';
import { merge } from 'moderndash';
import type { CfnTableName } from '../utils/cfn-outputs/cfn-outputs-table';

function createTableStack<
  StackName extends string,
  TableName extends CfnTableName
>(
  stack: Stack,
  props: Omit<TableConstructOptions<StackName, TableName>, 'stackName'>
) {
  TableConstruct.of(stack.stack, merge(props, { stackName: stack.name }));
}

type CreateVercelTableStackOptions<
  StackName extends string,
  TableName extends CfnTableName
> = Omit<TableConstructOptions<StackName, TableName>, 'stackName'> & {
  vercelUserArn: CfnVercelServerUserArn;
};

function createVercelTableStack<
  StackName extends string,
  TableName extends CfnTableName
>(stack: Stack, props: CreateVercelTableStackOptions<StackName, TableName>) {
  createTableStack(
    stack,
    merge(props, {
      grants: {
        readWrite: [getVercelUser(stack.stack, props.vercelUserArn)],
      },
    })
  );
}

export type { CreateVercelTableStackOptions };
export { createTableStack, createVercelTableStack };
