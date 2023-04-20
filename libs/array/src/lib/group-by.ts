import type { Transform } from '@almaclaine/types';
import { toString, identity } from '@almaclaine/core';

const groupBy = <T>(arr: T[], categorizer: Transform<T> = identity) => {
  const buckets: Record<string, T[]> = {};
  for (const val of arr) {
    const bucket = toString(categorizer(val));
    if (!(bucket in buckets)) {
      buckets[bucket] = [val];
    } else {
      buckets[bucket].push(val);
    }
  }
  return buckets;
};
export { groupBy };
