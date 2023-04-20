const flatten = <T>(arr: T[], depth: number = Number.MAX_SAFE_INTEGER) =>
  arr.flat(depth);
export { flatten };
