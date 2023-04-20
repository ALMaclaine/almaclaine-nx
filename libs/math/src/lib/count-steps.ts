import { unifyZero } from '@almaclaine/core';

function countSteps(
  val: number,
  step: number,
  overflow = Number.MAX_SAFE_INTEGER
) {
  return unifyZero(Math.floor(val / step) % overflow);
}

export { countSteps };
