import { unifyZero } from '@almaclaine/core';

function round(val: number, step = 1) {
  return unifyZero(Math.round(val / step) * step);
}

export { round };
