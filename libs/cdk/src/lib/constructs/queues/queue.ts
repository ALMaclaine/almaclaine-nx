import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../../types';
import type { DeadLetterQueue } from 'aws-cdk-lib/aws-sqs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import type { Duration } from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';

type QueueConstructOptions = ConstructDefaultTypes & {
  name: string;
  deadQueue?: DeadLetterQueue;
  retentionPeriod?: Duration;
  visibilityTimeout?: Duration;
  receiveMessageWaitTime?: Duration;
  fifo?: boolean;
};

function generateQueueName(name: string): string {
  return `${name}-queue`;
}

class QueueConstruct extends Construct {
  private readonly scope: Construct;

  private _queue?: Queue;

  private readonly name: string;
  private readonly prod: boolean;
  private readonly deadQueue?: DeadLetterQueue;
  private readonly retentionPeriod?: Duration;
  private readonly visibilityTimeout?: Duration;
  private readonly receiveMessageWaitTime?: Duration;
  private readonly fifo?: boolean;

  get queue(): Queue {
    if (!this._queue) {
      throw Error('Queue not initialized');
    }
    return this._queue;
  }

  constructor(
    scope: Construct,
    {
      name,
      prod,
      deadQueue,
      retentionPeriod,
      visibilityTimeout,
      receiveMessageWaitTime,
      fifo,
    }: QueueConstructOptions
  ) {
    super(scope, name);
    this.prod = prod ?? false;
    this.scope = scope;
    this.deadQueue = deadQueue;
    this.retentionPeriod = retentionPeriod;
    this.visibilityTimeout = visibilityTimeout;
    this.fifo = fifo;
    this.receiveMessageWaitTime = receiveMessageWaitTime;
    this.name = generateQueueName(name);
    this.initialize();
  }

  private initialize() {
    this.createQueue();
  }

  private createQueue() {
    this._queue = new Queue(this.scope, this.name, {
      removalPolicy: this.prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      deadLetterQueue: this.deadQueue,
      retentionPeriod: this.retentionPeriod,
      visibilityTimeout: this.visibilityTimeout,
      fifo: this.fifo,
      receiveMessageWaitTime: this.receiveMessageWaitTime,
      queueName: this.name,
    });
  }
}

export { QueueConstruct, generateQueueName };
export type { QueueConstructOptions };
