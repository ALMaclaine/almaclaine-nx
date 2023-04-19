import { isArray } from '@almaclaine/is';

const append = <T>(arr1: T[], add: T[] | T = []) => {
  if (isArray(add)) {
    arr1.push(...add);
  } else {
    arr1.push(add);
  }
  return arr1;
};
export { append };
