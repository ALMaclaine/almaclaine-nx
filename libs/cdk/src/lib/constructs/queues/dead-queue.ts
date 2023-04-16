import type { BaseQueueConstructOptions } from './base-queue';
import { BaseQueueConstruct } from './base-queue';

type DeadQueueConstructOptions = Omit<
  BaseQueueConstructOptions,
  'retentionPeriod'
>;

class DeadQueue extends BaseQueueConstruct {
  constructor(scope, options) {
    super(scope, options);
  }
}
