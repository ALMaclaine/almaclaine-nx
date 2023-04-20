import { findIndexLast } from './find-index-last';
import type { ArrayCallback } from '@almaclaine/types';

const findLast = <T>(
  arr: T[],
  cb: ArrayCallback<T>,
  defaultVal?: T
): T | undefined => {
  const lastIndex = findIndexLast(arr, cb);
  return arr[lastIndex] || defaultVal || undefined;
};
export { findLast };
