import { unifyZero } from '@almaclaine/core';

const parseFloat = (str: string): number => unifyZero(Number.parseFloat(str));
export { parseFloat };
