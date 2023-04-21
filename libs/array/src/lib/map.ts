function map<T, U>(arr: T[], fn: (x: T) => U): U[] {
  return arr.map(fn);
}

export { map };
