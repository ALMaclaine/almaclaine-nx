import { unifyZero } from '@almaclaine/core';

function lerp(ratio: number, start = 0, end = 1) {
  return unifyZero(start + (end - start) * ratio);
}

export { lerp };
