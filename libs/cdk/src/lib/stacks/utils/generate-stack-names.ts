import { lowerCaseLiteral } from '../../utils/utils';
import type { ArrayValues } from '@almaclaine/types';

const StackTypeValues = ['queue', 'user', 's3', 'dynamodb'] as const;
type StackType = ArrayValues<typeof StackTypeValues>;

const StackTypeSet = new Set(StackTypeValues);

const StackTypeEnum = {
  QUEUE: 'queue',
  USER: 'user',
  S3: 's3',
  DYNAMODB: 'dynamodb',
} as const;

class GenerateStackName {
  private static validateStackType(stackType: StackType) {
    if (!StackTypeSet.has(stackType)) {
      throw new Error(`Stack type ${stackType} is not a valid stack type`);
    }
  }

  static generate<Name extends string, Type extends StackType>(
    stackName: Name,
    stackType: Type
  ): `${Lowercase<Name>}-${Type}` {
    this.validateStackType(stackType);
    return `${lowerCaseLiteral(stackName)}-${stackType}`;
  }
}

export { GenerateStackName, StackTypeEnum, StackTypeValues };

export type { StackType };
