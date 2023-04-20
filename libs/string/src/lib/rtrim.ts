import { isUndefined } from '@almaclaine/is';
import type { Predicate } from '@almaclaine/types';

const rtrim = (val: string, predicate?: Predicate<string>) => {
  const { length } = val;
  if (length === 0) return '';

  if (isUndefined(predicate)) {
    return val.trimEnd();
  }

  let i = length - 1;
  while (0 <= i--) {
    if (!predicate(val[i])) break;
  }

  return val.slice(0, i + 1);
};
export { rtrim };
