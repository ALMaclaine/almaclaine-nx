const endsWith = (str: string, suffix: string) =>
  str.indexOf(suffix, str.length - suffix.length) !== -1;
export { endsWith };
