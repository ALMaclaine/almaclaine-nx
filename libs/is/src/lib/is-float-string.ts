import { isNumberString } from './is-number-string';
import { isFloat } from './is-float';

const isFloatString = (val: unknown): val is string =>
  isNumberString(val) && isFloat(parseFloat(val));
export { isFloatString };
