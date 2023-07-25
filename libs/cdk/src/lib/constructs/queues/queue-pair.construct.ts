import { Construct } from 'constructs';
import type { QueueConstructOptions } from './queue.construct';
import { Duration } from 'aws-cdk-lib';
import { DeadQueueConstruct } from './dead-queue.construct';
import { QueueConstruct } from './queue.construct';
import { Tags } from '../../utils/tags';

type QueuePairConstructOptions<
  StackName extends string,
  QueueName extends string
> = Omit<QueueConstructOptions<StackName, QueueName>, 'deadQueue'> & {
  queueName: QueueName;
};

class QueuePairConstruct<
  StackName extends string,
  QueueName extends string
> extends Construct {
  private readonly scope: Construct;
  private readonly retentionPeriod: Duration;
  private readonly visibilityTimeout?: Duration;
  private readonly receiveMessageWaitTime?: Duration;
  private readonly fifo?: boolean;
  private readonly prod: boolean;
  private readonly name: StackName;
  private readonly queueName: QueueName;
  private _deadQueue?: DeadQueueConstruct<StackName, QueueName>;
  private _queue?: QueueConstruct<StackName, QueueName>;

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
      retentionPeriod,
      visibilityTimeout,
      receiveMessageWaitTime,
      queueName,
      fifo,
    }: QueuePairConstructOptions<StackName, QueueName>
  ) {
    const _name = `${stackName}-queue-pair`;
    super(scope, _name);
    this.prod = Tags.isProd(scope);
    this.scope = scope;
    this.name = _name as StackName;
    this.retentionPeriod = retentionPeriod;
    this.visibilityTimeout = visibilityTimeout;
    this.receiveMessageWaitTime = receiveMessageWaitTime;
    this.fifo = fifo;
    this.queueName = queueName;
    this.initialize();
  }

  private initialize() {
    this.createDeadQueue();
    this.createQueue();
  }

  private createDeadQueue() {
    this._deadQueue = new DeadQueueConstruct(this, {
      queueName: this.queueName,
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
      stackName: this.name,
      queueName: this.queueName,
      receiveMessageWaitTime: Duration.seconds(20),
      retentionPeriod: this.retentionPeriod,
      visibilityTimeout: Duration.minutes(10),
      deadQueue: {
        queue: this._deadQueue?.queue,
        maxReceiveCount: 3,
      },
    });
  }

  static of<StackName extends string, QueueName extends string>(
    scope: Construct,
    props: QueuePairConstructOptions<StackName, QueueName>
  ) {
    return new QueuePairConstruct(scope, props);
  }
}

export { QueuePairConstruct };
export type { QueuePairConstructOptions };
