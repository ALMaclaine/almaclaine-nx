import {
  concatArn,
  concatDeadQueue,
  concatName,
  concatQueue,
  concatUrl,
} from './cfn-outputs-utils';

function generateCfnQueueName<Name extends string>(pre: Name) {
  return concatName(concatQueue(pre));
}

function generateCfnQueueUrl<Name extends string>(pre: Name) {
  return concatUrl(concatQueue(pre));
}

function generateCfnQueueArn<Name extends string>(pre: Name) {
  return concatArn(concatQueue(pre));
}

function generateCfnDeadQueueName<Name extends string>(pre: Name) {
  return concatName(concatDeadQueue(pre));
}

function generateCfnDeadQueueArn<Name extends string>(pre: Name) {
  return concatArn(concatDeadQueue(pre));
}

function generateCfnDeadQueueUrl<Name extends string>(pre: Name) {
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
