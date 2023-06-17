import type { QueueConstructOptions } from './queue';
import { QueueConstruct } from './queue';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { DashJoined } from '../../types';
import { generateConstructNameLiteral } from '../../utils/generate-construct-names';

function generateDeadQueueName(name: string): string {
  return `${name}-dead`;
}

function generateDeadQueueNameLiteral<T extends string>(
  name: T
): Lowercase<DashJoined<T, 'dead'>> {
  return generateConstructNameLiteral(name, 'dead');
}

type DeadQueueConstructOptions<T extends string> = Omit<
  QueueConstructOptions<T>,
  'retentionPeriod'
>;

class DeadQueueConstruct<T extends string> extends QueueConstruct<
  Lowercase<DashJoined<T, 'dead'>>
> {
  constructor(scope: Construct, options: DeadQueueConstructOptions<T>) {
    super(scope, {
      ...options,
      name: generateDeadQueueNameLiteral(options.name),
      retentionPeriod: Duration.days(14),
    });
  }
}

export {
  DeadQueueConstruct,
  generateDeadQueueName,
  generateDeadQueueNameLiteral,
};
export type { DeadQueueConstructOptions };
