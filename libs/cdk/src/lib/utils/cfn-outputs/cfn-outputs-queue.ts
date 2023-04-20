import {
  concatArn,
  concatDeadQueue,
  concatName,
  concatQueue,
  concatUrl,
} from './cfn-outputs-utils';

function generateQueueName(pre: string) {
  return concatName(concatQueue(pre));
}

function generateQueueUrl(pre: string) {
  return concatUrl(concatQueue(pre));
}

function generateQueueArn(pre: string) {
  return concatArn(concatQueue(pre));
}

function generateDeadQueueName(pre: string) {
  return concatName(concatDeadQueue(pre));
}

function generateDeadQueueArn(pre: string) {
  return concatArn(concatDeadQueue(pre));
}

function generateDeadQueueUrl(pre: string) {
  return concatUrl(concatDeadQueue(pre));
}

export {
  generateDeadQueueName,
  generateQueueName,
  generateQueueUrl,
  generateQueueArn,
  generateDeadQueueArn,
  generateDeadQueueUrl,
};
