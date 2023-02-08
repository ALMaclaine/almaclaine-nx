const isInfinite = (val: unknown): val is number =>
  Math.abs(val as number) === Infinity;
export { isInfinite };
