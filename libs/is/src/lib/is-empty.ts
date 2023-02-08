import { isArray } from './is-array';
import { isNull } from './is-null';
import { isObject } from './is-object';
import { isString } from './is-string';
import { isUndefined } from './is-undefined';

const isEmpty = (val: unknown): boolean => {
  // typeof null == 'object' so we check it first
  if (isNull(val) || isUndefined(val)) {
    return true;
  } else if (isString(val) || isArray(val)) {
    return !val.length;
  } else if (isObject(val)) {
    return Object.keys(val).length === 0;
  } else {
    return true;
  }
};
export { isEmpty };
