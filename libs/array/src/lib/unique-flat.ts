// keep items that are unique amongst all arrays
const uniqueFlat = <T>(...arrs: T[][]): T[] => {
  const uniqueSet = new Set<T>();
  const duplicateSet = new Set<T>();

  for (const arr of arrs) {
    for (const val of arr) {
      if (duplicateSet.has(val)) {
        continue;
      }

      if (uniqueSet.has(val)) {
        uniqueSet.delete(val);
        duplicateSet.add(val);
      } else {
        uniqueSet.add(val);
      }
    }
  }
  return Array.from(uniqueSet);
};
export { uniqueFlat };
