import type { QueueConstructOptions } from './queue.construct';
import { QueueConstruct } from './queue.construct';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { DashJoined } from '../../types';
import { lowerCaseLiteral } from '../../utils/generate-construct-names';

type DeadQueueConstructOptions<
  StackName extends string,
  DeadQueueName extends string
> = Omit<QueueConstructOptions<StackName, DeadQueueName>, 'retentionPeriod'>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class DeadQueueConstruct<
  StackName extends string,
  DeadQueueName extends string
> extends QueueConstruct<
  Lowercase<DashJoined<StackName, 'dead'>>,
  DeadQueueName
> {
  constructor(
    scope: Construct,
    options: DeadQueueConstructOptions<StackName, DeadQueueName>
  ) {
    super(scope, {
      ...options,
      stackName: `${lowerCaseLiteral(options.stackName)}-dead`,
      retentionPeriod: Duration.days(14),
    });
  }

  static override of<StackName extends string, DeadQueueName extends string>(
    scope: Construct,
    options: DeadQueueConstructOptions<StackName, DeadQueueName>
  ) {
    return new DeadQueueConstruct(scope, options);
  }
}

export { DeadQueueConstruct };
export type { DeadQueueConstructOptions };
