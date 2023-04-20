import type { ComparatorBoolean } from '@almaclaine/types';

const equalsString: ComparatorBoolean<string> = (
  num1: string,
  num2: string
): boolean => num1 === num2;
export { equalsString };
