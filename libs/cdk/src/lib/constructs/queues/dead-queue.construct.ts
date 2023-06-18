import type { QueueConstructOptions } from './queue.construct';
import { QueueConstruct } from './queue.construct';
import { Duration } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import type { DashJoined } from '../../types';
import { generateConstructNameLiteral } from '../../utils/generate-construct-names';

function generateDeadQueueName(name: string): string {
  return `${name}-dead`;
}

function generateDeadQueueNameLiteral<ConstructName extends string>(
  name: ConstructName
): Lowercase<DashJoined<ConstructName, 'dead'>> {
  return generateConstructNameLiteral(name, 'dead');
}

type DeadQueueConstructOptions<ConstructName extends string> = Omit<
  QueueConstructOptions<ConstructName>,
  'retentionPeriod'
>;

class DeadQueueConstruct<ConstructName extends string> extends QueueConstruct<
  Lowercase<DashJoined<ConstructName, 'dead'>>
> {
  constructor(
    scope: Construct,
    options: DeadQueueConstructOptions<ConstructName>
  ) {
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
