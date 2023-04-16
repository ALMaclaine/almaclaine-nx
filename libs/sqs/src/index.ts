export {
  SQSClientManager,
  createSQSClient,
  sendMessage,
  getMessage,
  deleteMessage,
} from './lib/sqs';

export type { SQSClient } from '@aws-sdk/client-sqs';
