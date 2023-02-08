const getKindOf = (val: unknown): string => {
  if (typeof Object.prototype.toString === 'function') {
    const out = Object.prototype.toString.call(val) as string;
    return out.slice(8, -1);
  }
  throw new Error(
    'Object.prototype.toString is not a function. Environment compromised'
  );
};

export { getKindOf };
