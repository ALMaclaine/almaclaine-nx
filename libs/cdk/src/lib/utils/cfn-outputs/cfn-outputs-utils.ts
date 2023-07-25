import type { JoinedString } from '../../types';
import { concatLiteral, upperCaseLiteral } from '../utils';
import type { Stages } from '../../constants';
import type { ArrayValues } from '@almaclaine/types';

function concatStage<Name extends string>(
  pre: Name,
  stage: Stages
): JoinedString<Name, Uppercase<Stages>> {
  return concatLiteral(pre, upperCaseLiteral(stage));
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
  'DeadQueue',
  'User',
  'Dead',
  'VercelServer',
  'UserPool',
  'UserPoolClient',
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
  DEAD_QUEUE: 'DeadQueue',
  VERCEL_SERVER: 'VercelServer',
  USER_POOL: 'UserPool',
  USER_POOL_CLIENT: 'UserPoolClient',
} as const;

class Concat {
  private static validateSymbol(symbol: ConcatSymbol) {
    if (!ConcatSet.has(symbol)) {
      throw new Error(`Symbol ${symbol} is not a valid symbol`);
    }
  }
  static concat<Pre extends string, Symbols extends ConcatSymbol>(
    pre: Pre,
    symbol: Symbols
  ): JoinedString<Pre, Symbols> {
    Concat.validateSymbol(symbol);
    return concatLiteral(pre, symbol);
  }

  static concatC<Pre extends string, Symbols extends ConcatSymbol>(
    symbol: Symbols
  ): (pre: Pre) => JoinedString<Pre, Symbols> {
    Concat.validateSymbol(symbol);
    return (pre: Pre) => Concat.concat(pre, symbol);
  }
}

export { Concat, ConcatEnum, concatStage };
