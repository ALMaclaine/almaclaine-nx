import { Construct } from 'constructs';
import type { QueueConstructOptions } from './queue';
import { Duration } from 'aws-cdk-lib';
import { DeadQueueConstruct } from './dead-queue';
import { generateConstructName } from '../../utils/generate-construct-names';
import { QueueConstruct } from './queue';
import type { Queue } from 'aws-cdk-lib/aws-sqs';

type QueuePairConstructOptions = Omit<QueueConstructOptions, 'deadQueue'> & {
  stackName: string;
};

class QueuePairConstruct extends Construct {
  private readonly scope: Construct;
  private readonly retentionPeriod: Duration;
  private readonly visibilityTimeout?: Duration;
  private readonly receiveMessageWaitTime?: Duration;
  private readonly fifo?: boolean;
  private readonly prod: boolean;
  private readonly name: string;
  private readonly stackName: string;
  private _deadQueue?: DeadQueueConstruct;
  private _queue?: QueueConstruct;

  get queue(): QueueConstruct {
    if (!this._queue) {
      throw Error('Queue not initialized');
    }

    return this._queue;
  }

  get deadQueue(): DeadQueueConstruct {
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
    }: QueuePairConstructOptions
  ) {
    super(scope, stackName);
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = name;
    this.stackName = stackName;
    this.retentionPeriod = retentionPeriod;
    this.visibilityTimeout = visibilityTimeout;
    this.receiveMessageWaitTime = receiveMessageWaitTime;
    this.fifo = fifo;
  }

  private initialize() {
    this.createDeadQueue();
    this.createQueue();
  }

  private createDeadQueue() {
    this._deadQueue = new DeadQueueConstruct(this, {
      prod: this.prod,
      name: generateConstructName(this.stackName, this.name),
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
      name: generateConstructName(this.stackName, this.name),
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
