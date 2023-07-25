import type { JoinedString } from '../../types';
import { concatLiteral, upperCaseLiteral } from '../utils';
import type { Stages } from '../../constants';
import type { ArrayValues } from '@almaclaine/types';

function concatName<Name extends string>(
  pre: Name
): JoinedString<Name, 'Name'> {
  return concatLiteral(pre, 'Name');
}

function concatArn<Name extends string>(pre: Name): JoinedString<Name, 'Arn'> {
  return concatLiteral(pre, 'Arn');
}

function concatAccessKeyId<Name extends string>(
  pre: Name
): JoinedString<Name, 'AccessKeyId'> {
  return concatLiteral(pre, 'AccessKeyId');
}

function concatSecretAccessKeyId<Name extends string>(
  pre: Name
): JoinedString<Name, 'SecretAccessKeyId'> {
  return concatLiteral(pre, 'SecretAccessKeyId');
}

function concatBucket<Name extends string>(
  pre: Name
): JoinedString<Name, 'Bucket'> {
  return concatLiteral(pre, 'Bucket');
}

function concatUrl<Name extends string>(pre: Name): JoinedString<Name, 'Url'> {
  return concatLiteral(pre, 'Url');
}

function concatTable<Name extends string>(
  pre: Name
): JoinedString<Name, 'Table'> {
  return concatLiteral(pre, 'Table');
}

function concatQueue<Name extends string>(
  pre: Name
): JoinedString<Name, 'Queue'> {
  return concatLiteral(pre, 'Queue');
}

function concatUser<Name extends string>(
  pre: Name
): JoinedString<Name, 'User'> {
  return concatLiteral(pre, 'User');
}

function concatDeadQueue<Name extends string>(
  pre: Name
): JoinedString<JoinedString<Name, 'Dead'>, 'Queue'> {
  return concatLiteral(pre, concatQueue('Dead'));
}

function concatStage<Name extends string>(
  pre: Name,
  stage: Stages
): JoinedString<Name, Uppercase<Stages>> {
  return concatLiteral(pre, stage.toUpperCase() as Uppercase<Stages>);
}

const ConcatSymbolValues = [
  'Name',
  'Arn',
  'AccessKeyId',
  'SecretAccessKeyId',
  'Bucket',
  'Url',
  'Table',
  'Queue',
  'User',
  'Dead',
] as const;

const ConcatSet = new Set(ConcatSymbolValues);

type ConcatSymbol = ArrayValues<typeof ConcatSymbolValues>;

const ConcatEnum = {
  NAME: 'Name',
  ARN: 'Arn',
  ACCESS_KEY_ID: 'AccessKeyId',
  SECRET_ACCESS_KEY_ID: 'SecretAccessKeyId',
  BUCKET: 'Bucket',
  URL: 'Url',
  TABLE: 'Table',
  QUEUE: 'Queue',
  USER: 'User',
  DEAD: 'Dead',
} as const;

class Concat {
  static concat<Pre extends string, Symbols extends ConcatSymbol>(
    pre: Pre,
    symbol: Symbols
  ): JoinedString<Uppercase<Pre>, Symbols> {
    if (!ConcatSet.has(symbol)) {
      throw new Error(`Symbol ${symbol} is not a valid symbol`);
    }

    return concatLiteral(upperCaseLiteral(pre), symbol);
  }
}

const test = Concat.concat('test' as const, ConcatEnum.QUEUE);

export {
  concatAccessKeyId,
  concatArn,
  concatBucket,
  concatDeadQueue,
  concatName,
  concatQueue,
  concatSecretAccessKeyId,
  concatStage,
  concatTable,
  concatUrl,
  concatUser,
};
