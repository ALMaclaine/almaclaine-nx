const combine = <T>(arr1: T[], arr2: T[] = []) => {
  const seenSet = new Set<T>(arr1);
  arr2.forEach((val) => !seenSet.has(val) && arr1.push(val));
  return arr1;
};
export { combine };
