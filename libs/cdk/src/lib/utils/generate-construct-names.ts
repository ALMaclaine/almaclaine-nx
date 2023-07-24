import { lowerCaseLiteral } from './utils';
import type { ArrayValues } from '@almaclaine/types';

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

const ValidConstructValues = [
  'queue',
  's3',
  'dynamodb',
  'user',
  'cognito-pool',
] as const;

const ValidConstructSet = new Set(ValidConstructValues);

type ValidConstruct = ArrayValues<typeof ValidConstructValues>;

const ValidConstructEnum = {
  queue: 'queue',
  s3: 's3',
  dynamodb: 'dynamodb',
  user: 'user',
  cognitoPool: 'cognito-pool',
} as const;

class ConstructNameGenerator<StackName extends string> {
  constructor(private readonly stackName: StackName) {}

  generateConstructName<
    ConstructName extends string,
    ConstructType extends ValidConstruct
  >(constructName: ConstructName, constructType: ConstructType) {
    if (!ValidConstructSet.has(constructType)) {
      throw new Error(
        `Construct type ${constructType} is not a valid construct type`
      );
    }

    return generateConstructNameLiteral(
      this.stackName,
      constructName,
      constructType
    );
  }

  static of<StackName extends string>(stackName: StackName) {
    return new ConstructNameGenerator(stackName);
  }
}

export {
  generateConstructNameLiteral,
  ConstructNameGenerator,
  ValidConstructEnum,
};

export type { ValidConstruct };
