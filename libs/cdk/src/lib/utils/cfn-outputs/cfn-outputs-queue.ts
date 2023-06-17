import {
  concatArn,
  concatDeadQueue,
  concatName,
  concatQueue,
  concatUrl,
} from './cfn-outputs-utils';

function generateCfnQueueName<T extends string>(pre: T) {
  return concatName(concatQueue(pre));
}

function generateCfnQueueUrl<T extends string>(pre: T) {
  return concatUrl(concatQueue(pre));
}

function generateCfnQueueArn<T extends string>(pre: T) {
  return concatArn(concatQueue(pre));
}

function generateCfnDeadQueueName<T extends string>(pre: T) {
  return concatName(concatDeadQueue(pre));
}

function generateCfnDeadQueueArn<T extends string>(pre: T) {
  return concatArn(concatDeadQueue(pre));
}

function generateCfnDeadQueueUrl<T extends string>(pre: T) {
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
