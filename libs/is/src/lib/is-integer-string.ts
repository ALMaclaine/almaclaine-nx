import { isNumberString } from './is-number-string';
import { isInteger } from './is-integer';

const isIntegerString = (val: unknown): val is string =>
  isNumberString(val) && isInteger(parseFloat(val));
export { isIntegerString };
