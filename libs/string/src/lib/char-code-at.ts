import { isNaN } from '@almaclaine/is';

const charCodeAt = (str: string, index: number) => {
  const val = str.charCodeAt(index);
  if (isNaN(val)) {
    return -1;
  } else {
    return val;
  }
};
export { charCodeAt };
