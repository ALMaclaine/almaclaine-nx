import { clamp } from '@almaclaine/core';

const insert = (string: string, index: number, partial: string) => {
  if (index < 0) {
    index = string.length + index;
  }

  index = clamp(index, 0, string.length);

  return string.slice(0, index) + partial + string.slice(index);
};
export { insert };
