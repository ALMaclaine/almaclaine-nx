import type { Predicate } from '@almaclaine/types';
import { isUndefined } from '@almaclaine/is';

const ltrim = (val: string, predicate?: Predicate<string>) => {
  const { length } = val;
  if (length === 0) return '';

  if (isUndefined(predicate)) {
    return val.trimStart();
  }

  let i = 0;
  while (i++ < length) {
    if (!predicate(val[i])) break;
  }
  return val.slice(i);
};
export { ltrim };
