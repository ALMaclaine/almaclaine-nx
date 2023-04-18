import {
  generateArn,
  generateName,
  generateUrl,
  prefix,
} from './cfn-outputs-utils';

function generateCfnOutputName(name: string, stage: string): string {
  return prefix(name, stage);
}

function generateCfnQueueName(pre: string) {
  return generateName(prefix(pre, 'Queue'));
}

function generateCfnQueueUrl(pre: string) {
  return generateUrl(prefix(pre, 'Queue'));
}

function generateCfnQueueArn(pre: string) {
  return generateArn(prefix(pre, 'Queue'));
}

function generateCfnDeadQueueName(pre: string) {
  return generateName(prefix(pre, 'DeadQueue'));
}

function generateCfnDeadQueueArn(pre: string) {
  return generateArn(prefix(pre, 'DeadQueue'));
}

function generateCfnDeadQueueUrl(pre: string) {
  return generateUrl(prefix(pre, 'DeadQueue'));
}

function generateCfnUserPoolName(pre: string) {
  return prefix(pre, 'UserPoolName');
}

function generateCfnUserPoolClientName(pre: string) {
  return prefix(pre, 'UserPoolClientName');
}

export {
  generateCfnOutputName,
  generateCfnUserPoolName,
  generateCfnUserPoolClientName,
  generateCfnDeadQueueName,
  generateCfnQueueName,
  generateCfnQueueUrl,
  generateCfnQueueArn,
  generateCfnDeadQueueArn,
  generateCfnDeadQueueUrl,
};
