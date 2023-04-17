function prefix(prefix: string, suffix: string): string {
  return `${prefix}${suffix}`;
}

function generateCfnOutputName(name: string, stage: string): string {
  return prefix(name, stage);
}

// Stack generators

function generateStackPrefix(prefix: string) {
  return `${prefix.toLowerCase()}`;
}

function generateStackName(prefix: string, stack: string) {
  return `${generateStackPrefix(prefix)}-${stack}`;
}

function generateCfnQueueStack(prefix: string) {
  return generateStackName(prefix, 'queue');
}

function generateCfnS3Stack(prefix: string) {
  return generateStackName(prefix, 's3');
}

function generateCfnTableStack(prefix: string) {
  return generateStackName(prefix, 'table');
}

function generateCfnUserStack(prefix: string) {
  return generateStackName(prefix, 'user');
}

function generateCfnAuthStack(prefix: string) {
  return generateStackName(prefix, 'auth');
}

// Output Names

function generateName(pre: string) {
  return prefix(pre, 'Name');
}

function generateArn(pre: string) {
  return prefix(pre, 'Arn');
}

function generateCfnTableName(pre: string) {
  return generateName(prefix(pre, 'Table'));
}

function generateCfnTableArn(pre: string) {
  return generateArn(`${pre}Table`);
}

function generateCfnVercelServerUser(pre: string) {
  return generateName(prefix(pre, 'VercelServerUser'));
}

function generateVercelServerUserArn(pre: string) {
  return generateArn(prefix(pre, 'VercelServerUser'));
}

function generateCfnQueueName(pre: string) {
  return generateName(prefix(pre, 'Queue'));
}

function generateCfnDeadQueueName(pre: string) {
  return generateCfnQueueName(prefix(pre, 'Dead'));
}

function generateCfnS3BucketName(pre: string) {
  return prefix(pre, 'BucketName');
}

function generateCfnS3BucketArn(pre: string) {
  return prefix(pre, 'BucketArn');
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
  generateCfnTableStack,
  generateCfnUserStack,
  generateCfnAuthStack,
  generateCfnTableName,
  generateCfnTableArn,
  generateCfnVercelServerUser,
  generateVercelServerUserArn,
  generateCfnDeadQueueName,
  generateCfnQueueName,
  generateCfnQueueStack,
  generateCfnS3BucketName,
  generateCfnS3BucketArn,
  generateCfnS3Stack,
};
