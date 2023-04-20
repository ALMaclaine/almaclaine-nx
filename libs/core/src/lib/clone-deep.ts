import { clone } from './clone';
import { forOwn } from './for-own';
import { isArray, isObject, isPlainObject } from '@almaclaine/is';

const _cloneDeep = (val: unknown, instanceClone: unknown): unknown => {
  if (isObject(val)) {
    return cloneObject(val, instanceClone);
  } else if (isArray(val)) {
    return cloneArray(val, instanceClone);
  } else {
    return clone(val);
  }
};

const cloneObject = (source: unknown, instanceClone: unknown): unknown => {
  if (isPlainObject(source)) {
    const out = {};
    forOwn(
      source,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (this: any, val: unknown, key: string) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this[key] = _cloneDeep(val, instanceClone);
      },
      out
    );
    return out;
  } else if (typeof instanceClone === 'function') {
    return instanceClone(source);
  } else {
    return source;
  }
};

const cloneArray = (arr: unknown[], instanceClone: unknown): unknown[] => {
  const out = [];
  let i = -1;
  const n = arr.length;
  while (++i < n) {
    out.push(_cloneDeep(arr[i], instanceClone));
  }
  return out;
};

const cloneDeep = <T>(
  val: T,
  useStructured = true,
  instanceClone?: CallableFunction
): T => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (globalThis.structuredClone && useStructured) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return globalThis.structuredClone(val);
  } else {
    return _cloneDeep(val, instanceClone) as T;
  }
};
export { cloneDeep };
