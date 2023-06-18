import { Construct } from 'constructs';
import type { QueueConstructOptions } from './queue.construct';
import { Duration } from 'aws-cdk-lib';
import { DeadQueueConstruct } from './dead-queue.construct';
import { generateConstructNameLiteral } from '../../utils/generate-construct-names';
import { QueueConstruct } from './queue.construct';

type QueuePairConstructOptions<StackName extends string> = Omit<
  QueueConstructOptions<StackName>,
  'deadQueue'
>;

class QueuePairConstruct<StackName extends string> extends Construct {
  private readonly scope: Construct;
  private readonly retentionPeriod: Duration;
  private readonly visibilityTimeout?: Duration;
  private readonly receiveMessageWaitTime?: Duration;
  private readonly fifo?: boolean;
  private readonly prod: boolean;
  private readonly name: StackName;
  private _deadQueue?: DeadQueueConstruct<StackName>;
  private _queue?: QueueConstruct<StackName>;

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
      stackName,
      prod,
      retentionPeriod,
      visibilityTimeout,
      receiveMessageWaitTime,
      fifo,
    }: QueuePairConstructOptions<StackName>
  ) {
    const _name = generateConstructNameLiteral(stackName, 'queue-pair');
    super(scope, _name);
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = _name as StackName;
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
      stackName: this.name,
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
      stackName: this.name,
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
