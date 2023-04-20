import type { Stages } from '../constants';
import type { StackProps } from 'aws-cdk-lib';

function getStackName(id: string, stage: Stages): string {
  return `${id}-stack-${stage as string}`;
}

function getStackNameFromProps(id: string, props: StackProps): string {
  return getStackName(id, props.tags?.['stage'] as Stages);
}

export { getStackName, getStackNameFromProps };
