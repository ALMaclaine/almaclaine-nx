import type { ArrayCallback } from '@almaclaine/types';

const filter = <T>(
  arr: T[],
  cb: ArrayCallback<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any
) => arr.filter(cb, thisArg);
export { filter };
