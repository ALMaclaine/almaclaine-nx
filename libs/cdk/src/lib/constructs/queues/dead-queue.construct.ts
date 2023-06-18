import type { QueueConstructOptions } from './queue.construct';
import { QueueConstruct } from './queue.construct';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { DashJoined } from '../../types';
import {
  generateQueueName,
  lowerCaseLiteral,
} from '../../utils/generate-construct-names';
import { concatLiteral } from '../../utils/utils';

type DeadQueueConstructOptions<
  StackName extends string,
  DeadQueueName extends string
> = Omit<QueueConstructOptions<StackName, DeadQueueName>, 'retentionPeriod'>;

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
}

export { DeadQueueConstruct };
export type { DeadQueueConstructOptions };
