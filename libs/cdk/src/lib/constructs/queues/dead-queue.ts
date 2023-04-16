import type { QueueConstructOptions } from './queue';
import { QueueConstruct } from './queue';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

type DeadQueueConstructOptions = Omit<QueueConstructOptions, 'retentionPeriod'>;

class DeadQueueConstruct extends QueueConstruct {
  constructor(scope: Construct, options: DeadQueueConstructOptions) {
    super(scope, { ...options, retentionPeriod: Duration.days(14) });
  }
}

export { DeadQueueConstruct };
export type { DeadQueueConstructOptions };
