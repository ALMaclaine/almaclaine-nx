import {
  concatArn,
  concatDeadQueue,
  concatName,
  concatQueue,
  concatUrl,
} from './cfn-outputs-utils';

function generateCfnQueueName(pre: string) {
  return concatName(concatQueue(pre));
}

function generateCfnQueueUrl(pre: string) {
  return concatUrl(concatQueue(pre));
}

function generateCfnQueueArn(pre: string) {
  return concatArn(concatQueue(pre));
}

function generateCfnDeadQueueName(pre: string) {
  return concatName(concatDeadQueue(pre));
}

function generateCfnDeadQueueArn(pre: string) {
  return concatArn(concatDeadQueue(pre));
}

function generateCfnDeadQueueUrl(pre: string) {
  return concatUrl(concatDeadQueue(pre));
}

export {
  generateCfnDeadQueueName,
  generateCfnQueueName,
  generateCfnQueueUrl,
  generateCfnQueueArn,
  generateCfnDeadQueueArn,
  generateCfnDeadQueueUrl,
};
