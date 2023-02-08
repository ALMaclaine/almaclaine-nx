import type { Sized } from '@almaclaine/types';

const isSameSize = (val1: Sized, val2: Sized): boolean => {
  return val1.length === val2.length;
};
export { isSameSize };
