import { lowerCaseLiteral } from '../../utils/utils';

function generateQueueStackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-queue` {
  return `${lowerCaseLiteral(stackName)}-queue`;
}

type GenerateQueueStackName = ReturnType<typeof generateQueueStackName>;

function generateUserStackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-user` {
  return `${lowerCaseLiteral(stackName)}-user`;
}

type GenerateUserStackName = ReturnType<typeof generateUserStackName>;

function generateS3StackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-s3` {
  return `${lowerCaseLiteral(stackName)}-s3`;
}

type GenerateS3StackName = ReturnType<typeof generateS3StackName>;

function generateDynamoStackName<StackName extends string>(
  stackName: StackName
): `${Lowercase<StackName>}-dynamodb` {
  return `${lowerCaseLiteral(stackName)}-dynamodb`;
}

type GenerateDynamoStackName = ReturnType<typeof generateDynamoStackName>;

export {
  generateQueueStackName,
  generateUserStackName,
  generateS3StackName,
  generateDynamoStackName,
};

export type {
  GenerateQueueStackName,
  GenerateUserStackName,
  GenerateS3StackName,
  GenerateDynamoStackName,
};
