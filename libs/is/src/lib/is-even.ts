import { isNumber } from './is-number';

const isEven = (val: unknown): val is number => isNumber(val) && val % 2 === 0;
export { isEven };
