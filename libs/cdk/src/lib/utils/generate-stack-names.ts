import { lowerCaseLiteral } from './utils';

function generateQueueStackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-queue` {
  return `${lowerCaseLiteral(stackName)}-queue`;
}

function generateUserStackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-user` {
  return `${lowerCaseLiteral(stackName)}-user`;
}

function generateS3StackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-s3` {
  return `${lowerCaseLiteral(stackName)}-s3`;
}

function generateDynamoStackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-dynamodb` {
  return `${lowerCaseLiteral(stackName)}-dynamodb`;
}

export {
  generateQueueStackName,
  generateUserStackName,
  generateS3StackName,
  generateDynamoStackName,
};
