import { sameSize } from './same-size';
import type { ComparatorBoolean } from '@almaclaine/types';

const defaultComparator = <T>(val1: T, val2: T) => val1 === val2;
const equalsArray = <T>(
  arr1: T[],
  arr2: T[],
  comparator: ComparatorBoolean<T> = defaultComparator
) => {
  if (!sameSize(arr1, arr2)) {
    return false;
  }

  return arr1.every((val, index) => comparator(val, arr2[index]));
};
export { equalsArray };
