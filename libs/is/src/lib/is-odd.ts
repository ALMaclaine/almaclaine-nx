import { isNumber } from './is-number';

const isOdd = (val: unknown): val is number =>
  isNumber(val) && Math.abs(val % 2) === 1;
export { isOdd };
