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
