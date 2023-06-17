import { Construct } from 'constructs';
import type { QueueConstructOptions } from './queue';
import { Duration } from 'aws-cdk-lib';
import { DeadQueueConstruct } from './dead-queue';
import { generateConstructNameLiteral } from '../../utils/generate-construct-names';
import { QueueConstruct } from './queue';

type QueuePairConstructOptions<T extends string, K extends string> = Omit<
  QueueConstructOptions<K>,
  'deadQueue'
> & {
  stackName: T;
};

class QueuePairConstruct<T extends string, K extends string> extends Construct {
  private readonly scope: Construct;
  private readonly retentionPeriod: Duration;
  private readonly visibilityTimeout?: Duration;
  private readonly receiveMessageWaitTime?: Duration;
  private readonly fifo?: boolean;
  private readonly prod: boolean;
  private readonly name: K;
  private readonly stackName: T;
  private _deadQueue?: DeadQueueConstruct<`${Lowercase<T>}-${Lowercase<K>}`>;
  private _queue?: QueueConstruct<`${Lowercase<T>}-${Lowercase<K>}`>;

  get queue() {
    if (!this._queue) {
      throw Error('Queue not initialized');
    }

    return this._queue;
  }

  get deadQueue() {
    if (!this._deadQueue) {
      throw Error('Dead Queue not initialized');
    }

    return this._deadQueue;
  }

  constructor(
    scope: Construct,
    {
      name,
      stackName,
      prod,
      retentionPeriod,
      visibilityTimeout,
      receiveMessageWaitTime,
      fifo,
    }: QueuePairConstructOptions<T, K>
  ) {
    const a = generateConstructNameLiteral(stackName, 'queue-pair');
    super(scope, generateConstructNameLiteral(a, name));
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = name;
    this.stackName = stackName;
    this.retentionPeriod = retentionPeriod;
    this.visibilityTimeout = visibilityTimeout;
    this.receiveMessageWaitTime = receiveMessageWaitTime;
    this.fifo = fifo;
    this.initialize();
  }

  private initialize() {
    this.createDeadQueue();
    this.createQueue();
  }

  private createDeadQueue() {
    this._deadQueue = new DeadQueueConstruct(this, {
      prod: this.prod,
      name: generateConstructNameLiteral<T, K>(this.stackName, this.name),
      receiveMessageWaitTime: Duration.seconds(20),
      visibilityTimeout: Duration.minutes(10),
    });
  }

  private createQueue() {
    if (!this._deadQueue) {
      throw Error('Dead queue not initialized');
    }

    this._queue = new QueueConstruct(this, {
      prod: this.prod,
      name: generateConstructNameLiteral(this.stackName, this.name),
      receiveMessageWaitTime: Duration.seconds(20),
      retentionPeriod: this.retentionPeriod,
      visibilityTimeout: Duration.minutes(10),
      deadQueue: {
        queue: this._deadQueue?.queue,
        maxReceiveCount: 3,
      },
    });
  }
}

export { QueuePairConstruct };
export type { QueuePairConstructOptions };
