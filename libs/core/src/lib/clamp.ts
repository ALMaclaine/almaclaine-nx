import { unifyZero } from './unify-zero';

const clamp = (val: number, min = 0, max = 1) => {
  const or = val > max ? max : val;
  return unifyZero(val < min ? min : or);
};
export { clamp };
