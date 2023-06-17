import type { Stages } from '../constants';
import type { StackProps } from 'aws-cdk-lib';
import type { DashJoined } from '../types';
import { generateConstructNameLiteral } from './generate-construct-names';

type StackName<T extends string> = Lowercase<
  DashJoined<DashJoined<T, 'stack'>, Stages>
>;

function getStackName<T extends string>(id: T, stage: Stages): StackName<T> {
  const a = generateConstructNameLiteral(id, 'stack');
  return generateConstructNameLiteral(a, stage);
}

function getStackNameFromProps<T extends string>(
  id: T,
  props: StackProps
): StackName<T> {
  const val = props.tags?.['stage'];
  if (!val) throw new Error('No stage tag found in props');

  return getStackName(id, val as Stages);
}

export { getStackName, getStackNameFromProps };
export type { StackName };
