import { isString } from './is-string';
import { isNaN } from './is-nan';

const isNumberString = (val: unknown): val is string => {
  if (!isString(val)) {
    return false;
  }

  const parsed = parseFloat(val);
  if (isNaN(parsed)) {
    return val === 'NaN';
  }

  return true;
};
export { isNumberString };
