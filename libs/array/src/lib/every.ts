import type { ArrayCallback } from '@almaclaine/types';

const every = <T>(
  arr: T[],
  cb: ArrayCallback<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any
) => arr.every(cb, thisArg);
export { every };
