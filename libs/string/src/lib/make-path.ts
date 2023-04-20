const makePath = (...args: string[]) =>
  args
    .filter(Boolean)
    .join('/')
    .replace(/([^:/]|^)\/{2,}/g, '$1/');

export { makePath };
