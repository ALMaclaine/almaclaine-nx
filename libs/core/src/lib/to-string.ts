import { isArray, isNull, isPrintable, isUndefined } from '@almaclaine/is';

const toString = (val: unknown): string => {
  if (isNull(val) || isUndefined(val)) {
    return '';
  }

  if (isArray(val)) {
    return `[${val.map((e) => toString(e)).join(', ')}]`;
  }

  if (!isPrintable(val)) {
    return '';
  }

  const str = val.toString();
  if (str === '[object Object]') {
    return JSON.stringify(val);
  }
  return str;
};
export { toString };
