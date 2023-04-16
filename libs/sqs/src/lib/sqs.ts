import type { SQSClientConfig } from '@aws-sdk/client-sqs';
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

class SQSClientManager {
  private readonly _s3Clients: Map<SQSClientConfig, SQSClient> = new Map();
  static readonly sqsDefaultConfig: SQSClientConfig = {};

  getOrCreateSQSClient(
    config: SQSClientConfig = SQSClientManager.sqsDefaultConfig
  ): SQSClient {
    const res = this._s3Clients.get(config);
    if (res) {
      return res;
    }
    const s3Client = new SQSClient(config);
    this._s3Clients.set(config, s3Client);
    return s3Client;
  }
}

function createSQSClient(config: SQSClientConfig = {}) {
  return new SQSClient(config);
}

function getMessage(url: string, sqs: SQSClient) {
  return sqs.send(
    new ReceiveMessageCommand({ QueueUrl: url, WaitTimeSeconds: 20 })
  );
}

function deleteMessage(url: string, receiptHandle: string, sqs: SQSClient) {
  const deleteParams = {
    QueueUrl: url,
    ReceiptHandle: receiptHandle,
  };
  return sqs.send(new DeleteMessageCommand(deleteParams));
}

function sendMessage(url: string, body: string, sqs: SQSClient) {
  const sendParams = {
    MessageBody: body,
    QueueUrl: url,
  };
  return sqs.send(new SendMessageCommand(sendParams));
}

export {
  SQSClientManager,
  createSQSClient,
  sendMessage,
  getMessage,
  deleteMessage,
};
