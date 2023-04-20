import { clamp } from '@almaclaine/core';

function norm(val: number, x: number, y: number) {
  return clamp((val - x) / (y - x));
}

export { norm };
