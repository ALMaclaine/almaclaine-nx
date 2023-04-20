const includes = <T>(arr: T[], val: T, from?: number) =>
  arr.includes(val, from);

const contains = includes;
export { includes, contains };
