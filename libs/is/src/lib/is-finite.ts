import { isString } from './is-string';
import { isNumber } from './is-number';

const isFinite = (val: unknown): val is number => {
  if (isString(val) && val !== '') {
    return globalThis.isFinite(parseFloat(val));
  } else if (isNumber(val)) {
    // need to use isNumber because of Number constructor
    return globalThis.isFinite(val);
  }

  return false;
};
export { isFinite };
