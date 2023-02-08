import { isNumber } from './is-number';

const is = (x: unknown, y: unknown): boolean => {
  // implementation borrowed from harmony:egal spec
  if (x === y && isNumber(x) && isNumber(y)) {
    // 0 === -0, but they are not identical
    return x !== 0 || 1 / x === 1 / y;
  } else if (x === y) {
    return true;
  }

  // NaN !== NaN, but they are identical.
  // NaNs are the only non-reflexive value, i.e., if x !== x,
  // then x is a NaN.
  // isNaN is broken: it converts its argument to number, so
  // isNaN("foo") => true
  return x !== x && y !== y;
};
export { is };
