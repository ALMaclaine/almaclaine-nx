import { Whitespace } from '@almaclaine/types';
import { isString } from './is-string';
import { WHITE_SPACES_SET } from '@almaclaine/constants';

const isWhitespace = (val: unknown): val is Whitespace =>
  isString(val) && WHITE_SPACES_SET.has(val);

export { isWhitespace };
