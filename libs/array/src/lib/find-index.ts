import type { ArrayCallback } from '@almaclaine/types';

const findIndex = <T>(
  arr: T[],
  cb: ArrayCallback<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any
) => arr.findIndex(cb, thisArg);
export { findIndex };
