import type { ArrayCallback } from '@almaclaine/types';

const find = <T>(
  arr: T[],
  cb: ArrayCallback<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any
) => arr.find(cb, thisArg);
export { find };
