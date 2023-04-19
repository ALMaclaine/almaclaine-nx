import { isArray, isNumber, isString } from '@almaclaine/is';

const toNumber = (val: unknown): number => {
  // numeric values should come first because of -0
  if (isNumber(val)) return val;
  // we want all falsy values (besides -0) to return zero to avoid
  // headaches
  if (!val) return 0;
  if (isString(val)) return parseFloat(val);
  // arrays are edge cases. `Number([4]) === 4`
  if (isArray(val)) return NaN;
  return Number(val);
};
export { toNumber };
