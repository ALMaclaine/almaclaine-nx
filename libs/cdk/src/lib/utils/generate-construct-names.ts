import type { ConstructNameLiteral } from '../types';
import { lowerCaseLiteral } from './utils';

function generateConstructNameLiteral<
  StackName extends string,
  ConstructName extends string,
  ConstructType extends string
>(
  stackName: StackName,
  constructName: ConstructName,
  constructType: ConstructType
): ConstructNameLiteral<StackName, ConstructName, ConstructType> {
  return `${lowerCaseLiteral(stackName)}-${lowerCaseLiteral(
    constructName
  )}-${lowerCaseLiteral(constructType)}` as ConstructNameLiteral<
    StackName,
    ConstructName,
    ConstructType
  >;
}

function generateQueueName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): ConstructNameLiteral<StackName, ConstructName, 'queue'> {
  return generateConstructNameLiteral(stackName, constructName, 'queue');
}

function generateS3Name<StackName extends string, ConstructName extends string>(
  stackName: StackName,
  constructName: ConstructName
): ConstructNameLiteral<StackName, ConstructName, 's3'> {
  return generateConstructNameLiteral(stackName, constructName, 's3');
}

function generateTableName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): ConstructNameLiteral<StackName, ConstructName, 'dynamodb'> {
  return generateConstructNameLiteral(stackName, constructName, 'dynamodb');
}

function generateUserName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): ConstructNameLiteral<StackName, ConstructName, 'user'> {
  return generateConstructNameLiteral(stackName, constructName, 'user');
}

function generateAuthName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): ConstructNameLiteral<StackName, ConstructName, 'cognito-pool'> {
  return generateConstructNameLiteral(stackName, constructName, 'cognito-pool');
}

export {
  lowerCaseLiteral,
  generateConstructNameLiteral,
  generateQueueName,
  generateS3Name,
  generateTableName,
  generateUserName,
  generateAuthName,
};
