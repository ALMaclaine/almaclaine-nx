import { unifyZero } from '@almaclaine/core';

function ceil(val: number, step = 1) {
  const absStep = Math.abs(step);
  return unifyZero(Math.ceil(val / absStep) * absStep);
}

export { ceil };
