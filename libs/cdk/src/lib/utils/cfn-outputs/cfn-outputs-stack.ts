function generateStackPrefix(prefix: string) {
  return prefix.toLowerCase();
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

export {
  generateStackPrefix,
  generateStackName,
  generateCfnQueueStack,
  generateCfnS3Stack,
  generateCfnTableStack,
  generateCfnUserStack,
  generateCfnAuthStack,
};
