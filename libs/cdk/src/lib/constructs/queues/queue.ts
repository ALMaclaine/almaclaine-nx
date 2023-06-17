import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../../types';
import type { DeadLetterQueue } from 'aws-cdk-lib/aws-sqs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import type { Duration } from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { generateConstructNameLiteral } from '../../utils/generate-construct-names';

type QueueBaseProps = {
  retentionPeriod: Duration;
  visibilityTimeout?: Duration;
  receiveMessageWaitTime?: Duration;
};

type QueueConstructOptions<T extends string> = ConstructDefaultTypes<T> &
  QueueBaseProps & {
    deadQueue?: DeadLetterQueue;
    fifo?: boolean;
  };

function generateQueueName(name: string): string {
  return `${name}-queue`;
}

function generateQueueNameLiteral<T extends string>(
  stackName: T
): Lowercase<DashJoined<T, 'queue'>> {
  return generateConstructNameLiteral(stackName, 'queue');
}

class QueueConstruct<T extends string> extends Construct {
  private readonly scope: Construct;

  private readonly prod: boolean;

  private _queue?: Queue;
  readonly name: Lowercase<DashJoined<T, 'queue'>>;
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
      name,
      prod,
      deadQueue,
      retentionPeriod,
      visibilityTimeout,
      receiveMessageWaitTime,
      fifo,
    }: QueueConstructOptions<T>
  ) {
    const _name = generateQueueNameLiteral(name);
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

export { QueueConstruct, generateQueueName };
export type { QueueConstructOptions, QueueBaseProps };
