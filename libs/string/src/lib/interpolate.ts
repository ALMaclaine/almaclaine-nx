import { parseFloat } from './parse-float';
import { isArray, isNumber, isObject, isUndefined } from '@almaclaine/is';
import { get } from '@almaclaine/core';
import { isNaN } from '@almaclaine/is';

const stache = /\{\{([^}]+)}}/g;

const interpolate = (
  template: string,
  replacements: string[] | Record<string, unknown>,
  syntax?: string | RegExp
) => {
  const replaceFn = function (_: string, prop: string) {
    if (isArray(replacements)) {
      const parsed = parseFloat(prop);
      if (isNumber(parsed) && !isNaN(parsed)) {
        const val = replacements[parsed];
        return !isUndefined(val) ? val : '';
      }
    } else if (isObject(replacements)) {
      const val = get(replacements, prop);
      return !isUndefined(val) ? val : '';
    }

    return prop;
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return template.replace(syntax || stache, replaceFn);
};
export { interpolate };
