import type { ArrayCallback } from '@almaclaine/types';
import { append } from '@almaclaine/core';

// collect is like map except callback can return array of T
const collect = <T>(arr: T[], cb: ArrayCallback<T, T | T[]>) => {
  const res: T[] = [];
  for (const [key, val] of arr.entries()) {
    append(res, cb(val, key, arr));
  }
  return res;
};
export { collect };
