import { isNumber } from './is-number';
import { isFinite } from './is-finite';

const isFloat = (val: unknown): val is number =>
  isFinite(val) && isNumber(val) && val % 1 !== 0;
export { isFloat };
