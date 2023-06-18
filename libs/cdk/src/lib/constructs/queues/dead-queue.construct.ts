import type { QueueConstructOptions } from './queue.construct';
import { QueueConstruct } from './queue.construct';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { DashJoined } from '../../types';
import { generateConstructNameLiteral } from '../../utils/generate-construct-names';

function generateDeadQueueNameLiteral<StackName extends string>(
  name: StackName
): Lowercase<DashJoined<StackName, 'dead'>> {
  return generateConstructNameLiteral(name, 'dead');
}

type DeadQueueConstructOptions<StackName extends string> = Omit<
  QueueConstructOptions<StackName>,
  'retentionPeriod'
>;

class DeadQueueConstruct<StackName extends string> extends QueueConstruct<
  Lowercase<DashJoined<StackName, 'dead'>>
> {
  constructor(scope: Construct, options: DeadQueueConstructOptions<StackName>) {
    super(scope, {
      ...options,
      stackName: generateDeadQueueNameLiteral(options.stackName),
      retentionPeriod: Duration.days(14),
    });
  }
}

export { DeadQueueConstruct, generateDeadQueueNameLiteral };
export type { DeadQueueConstructOptions };
