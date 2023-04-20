import { isNaN } from '@almaclaine/is';

const codePointAt = (str: string, index: number) => {
  const val = str.codePointAt(index);
  if (isNaN(val)) {
    return -1;
  } else {
    return val;
  }
};
export { codePointAt };
