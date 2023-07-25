import type { ArrayValues } from '@almaclaine/types';
import { generateConstructNameLiteral } from '../../utils/utils';

const ConstructValues = [
  'queue',
  's3',
  'dynamodb',
  'user',
  'cognito-pool',
] as const;

const ConstructSet = new Set(ConstructValues);

type ValidConstruct = ArrayValues<typeof ConstructValues>;

const ConstructEnum = {
  QUEUE: 'queue',
  S3: 's3',
  DYNAMODB: 'dynamodb',
  USER: 'user',
  COGNITO_POOL: 'cognito-pool',
} as const;

class ConstructNameGenerator<StackName extends string> {
  constructor(private readonly stackName: StackName) {}

  generateConstructName<
    ConstructName extends string,
    ConstructType extends ValidConstruct
  >(constructName: ConstructName, constructType: ConstructType) {
    if (!ConstructSet.has(constructType)) {
      throw new Error(
        `Construct type ${constructType} is not a valid construct type`
      );
    }

    return generateConstructNameLiteral(
      this.stackName,
      constructType,
      constructName
    );
  }

  static of<StackName extends string>(stackName: StackName) {
    return new ConstructNameGenerator(stackName);
  }
}

export { ConstructNameGenerator, ConstructEnum };

export type { ValidConstruct };
