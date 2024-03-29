import type { Stages } from '../../constants';
import type { StackProps } from 'aws-cdk-lib';
import type { ConstructNameLiteral } from '../../types';
import { generateConstructNameLiteral } from '../../utils/utils';

type StackName<Name extends string> = ConstructNameLiteral<
  Name,
  Stages,
  'stack'
>;

function getStackName<Name extends string>(
  id: Name,
  stage: Stages
): StackName<Name> {
  return generateConstructNameLiteral(id, 'stack', stage);
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
