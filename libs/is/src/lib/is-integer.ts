import { isNumber } from './is-number';

const isInteger = (val: unknown): val is number =>
  isNumber(val) && val % 1 === 0;
export { isInteger };
