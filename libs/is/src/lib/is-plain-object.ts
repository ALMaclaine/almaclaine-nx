const isPlainObject = (value: unknown): value is object => {
  return !!value && typeof value === 'object' && value.constructor === Object;
};
export { isPlainObject };
