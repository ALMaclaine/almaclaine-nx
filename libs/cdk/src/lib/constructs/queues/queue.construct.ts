import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../../types';
import type { DeadLetterQueue } from 'aws-cdk-lib/aws-sqs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import type { Duration } from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { generateQueueName } from '../../utils/generate-construct-names';
import type { ConstructNameLiteral } from '../../types';

type QueueBaseProps = {
  retentionPeriod: Duration;
  visibilityTimeout?: Duration;
  receiveMessageWaitTime?: Duration;
};

type QueueConstructOptions<
  StackName extends string,
  QueueName extends string
> = ConstructDefaultTypes<StackName> &
  QueueBaseProps & {
    deadQueue?: DeadLetterQueue;
    fifo?: boolean;
    queueName: QueueName;
  };

class QueueConstruct<
  StackName extends string,
  QueueName extends string
> extends Construct {
  private readonly scope: Construct;

  private readonly prod: boolean;

  private _queue?: Queue;
  readonly name: ConstructNameLiteral<StackName, QueueName, 'queue'>;
  private readonly deadQueue?: DeadLetterQueue;
  private readonly retentionPeriod: Duration;
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
      stackName,
      prod,
      deadQueue,
      retentionPeriod,
      visibilityTimeout,
      receiveMessageWaitTime,
      fifo,
      queueName,
    }: QueueConstructOptions<StackName, QueueName>
  ) {
    const _name = generateQueueName(stackName, queueName);
    super(scope, _name);
    this.prod = prod ?? false;
    this.scope = scope;
    this.deadQueue = deadQueue;
    this.retentionPeriod = retentionPeriod;
    this.visibilityTimeout = visibilityTimeout;
    this.fifo = fifo;
    this.receiveMessageWaitTime = receiveMessageWaitTime;
    this.name = _name;
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

export { QueueConstruct };
export type { QueueConstructOptions, QueueBaseProps };
