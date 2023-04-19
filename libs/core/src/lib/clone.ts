import { mixIn } from './mix-in';
import {
  isArray,
  isDate,
  isObject,
  isPlainObject,
  isRegex,
} from '@almaclaine/is';

const cloneObject = (source: unknown): unknown => {
  if (isPlainObject(source)) {
    return mixIn({}, source);
  } else {
    return source;
  }
};

const cloneRegex = (r: RegExp): RegExp => {
  const flags = [
    r.multiline ? 'm' : '',
    r.global ? 'g' : '',
    r.ignoreCase ? 'i' : '',
  ]
    .filter(Boolean)
    .join('');
  return new RegExp(r.source, flags);
};

const cloneDate = (date: Date): Date => new Date(+date);

const cloneArray = (arr: unknown[]): unknown[] => {
  return arr.slice();
};

const _clone = (val: unknown): unknown => {
  if (isObject(val)) {
    return cloneObject(val);
  } else if (isArray(val)) {
    return cloneArray(val);
  } else if (isRegex(val)) {
    return cloneRegex(val);
  } else if (isDate(val)) {
    return cloneDate(val);
  }
  return val;
};

const clone = <T>(val: T): T => _clone(val) as T;

export { clone };
