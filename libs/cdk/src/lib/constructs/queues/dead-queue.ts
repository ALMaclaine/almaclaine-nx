import type { QueueConstructOptions } from './queue';
import { QueueConstruct } from './queue';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';

function generateDeadQueueName(name: string): string {
  return `${name}-dead`;
}

type DeadQueueConstructOptions = Omit<QueueConstructOptions, 'retentionPeriod'>;

class DeadQueueConstruct extends QueueConstruct {
  constructor(scope: Construct, options: DeadQueueConstructOptions) {
    super(scope, {
      ...options,
      name: generateDeadQueueName(options.name),
      retentionPeriod: Duration.days(14),
    });
  }
}

export { DeadQueueConstruct, generateDeadQueueName };
export type { DeadQueueConstructOptions };
