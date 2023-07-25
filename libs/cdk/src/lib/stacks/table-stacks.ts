import type { Stack } from '../stack';
import type { TableConstructOptions } from '../constructs/table.construct';
import { TableConstruct } from '../constructs/table.construct';
import { getVercelUser } from '../utils/get-user';
import { merge } from 'moderndash';
import type { CfnOutputNameGenerator } from '../utils/cfn-outputs/cfn-output-name-generator';

function createTableStack<
  StackName extends string,
  TableName extends ReturnType<typeof CfnOutputNameGenerator.tableName>
>(
  stack: Stack,
  props: Omit<TableConstructOptions<StackName, TableName>, 'stackName'>
) {
  TableConstruct.of(stack.stack, merge(props, { stackName: stack.name }));
}

type CreateVercelTableStackOptions<
  StackName extends string,
  TableName extends ReturnType<typeof CfnOutputNameGenerator.tableName>
> = Omit<TableConstructOptions<StackName, TableName>, 'stackName'> & {
  vercelUserArn: ReturnType<typeof CfnOutputNameGenerator.vercelServerUserArn>;
};

function createVercelTableStack<
  StackName extends string,
  TableName extends ReturnType<typeof CfnOutputNameGenerator.tableName>
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
