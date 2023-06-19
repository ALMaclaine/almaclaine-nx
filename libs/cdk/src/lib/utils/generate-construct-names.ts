import { lowerCaseLiteral } from './utils';

function generateConstructNameLiteral<
  StackName extends string,
  ConstructName extends string,
  ConstructType extends string
>(
  stackName: StackName,
  constructName: ConstructName,
  constructType: ConstructType
): `${Lowercase<StackName>}-${Lowercase<ConstructName>}-${Lowercase<ConstructType>}` {
  return `${lowerCaseLiteral(stackName)}-${lowerCaseLiteral(
    constructName
  )}-${lowerCaseLiteral(constructType)}`;
}

function generateQueueName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): `${Lowercase<StackName>}-queue-${Lowercase<ConstructName>}` {
  return generateConstructNameLiteral(stackName, 'queue', constructName);
}

function generateS3Name<StackName extends string, ConstructName extends string>(
  stackName: StackName,
  constructName: ConstructName
): `${Lowercase<StackName>}-s3-${Lowercase<ConstructName>}` {
  return generateConstructNameLiteral(stackName, 's3', constructName);
}

function generateTableName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): `${Lowercase<StackName>}-dynamodb-${Lowercase<ConstructName>}` {
  return generateConstructNameLiteral(stackName, 'dynamodb', constructName);
}

function generateUserName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): `${Lowercase<StackName>}-user-${Lowercase<ConstructName>}` {
  return generateConstructNameLiteral(stackName, 'user', constructName);
}

function generateAuthName<
  StackName extends string,
  ConstructName extends string
>(
  stackName: StackName,
  constructName: ConstructName
): `${Lowercase<StackName>}-cognito-pool-${Lowercase<ConstructName>}` {
  return generateConstructNameLiteral(stackName, 'cognito-pool', constructName);
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
