import type { ArrayCallback } from '@almaclaine/types';

const forEach = <T>(
  arr: T[],
  cb: ArrayCallback<T, boolean | void>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisObj?: any
) => {
  let i = -1;
  while (++i < arr.length) {
    const result = cb.call(thisObj, arr[i], i, arr);
    if (result === false) {
      break;
    }
  }
};
export { forEach };
