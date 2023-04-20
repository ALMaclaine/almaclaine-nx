import { join, lowerCase } from '@almaclaine/string';

function generateConstructPrefix(prefix: string) {
  return lowerCase(prefix);
}

function generateConstructName(prefix: string, name: string) {
  return join('-', generateConstructPrefix(prefix), name);
}

function generateQueueStackName(prefix: string) {
  return generateConstructName(prefix, 'queue');
}

function generateS3StackName(prefix: string) {
  return generateConstructName(prefix, 's3');
}

function generateTableStackName(prefix: string) {
  return generateConstructName(prefix, 'table');
}

function generateUserStackName(prefix: string) {
  return generateConstructName(prefix, 'user');
}

function generateAuthStackName(prefix: string) {
  return generateConstructName(prefix, 'auth');
}

export {
  generateConstructPrefix,
  generateConstructName,
  generateQueueStackName,
  generateS3StackName,
  generateTableStackName,
  generateUserStackName,
  generateAuthStackName,
};
