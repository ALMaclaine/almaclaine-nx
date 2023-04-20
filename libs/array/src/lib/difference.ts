// keep items that are only in first array
const difference = <T>(first: T[], ...arrs: T[][]): T[] => {
  const firstSet = new Set<T>(first);

  for (const arr of arrs) {
    for (const val of arr) {
      if (firstSet.has(val)) {
        firstSet.delete(val);
      }
    }
  }
  return Array.from(firstSet);
};
export { difference };
