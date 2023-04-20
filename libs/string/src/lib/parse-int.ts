import { unifyZero } from '@almaclaine/core';

const parseInt = (str: string, radix?: number): number =>
  unifyZero(Number.parseInt(str, radix));
export { parseInt };
