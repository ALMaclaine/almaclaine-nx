import { isNaN } from '@almaclaine/is';

const typeCast = (
  str: string
): null | boolean | undefined | string | number => {
  if (str === null || str === 'null') {
    return null;
  } else if (str === 'true') {
    return true;
  } else if (str === 'false') {
    return false;
  } else if (str === undefined || str === 'undefined') {
    return undefined;
  } else {
    const parsed = parseFloat(str);
    if (str === '' || isNaN(parsed)) {
      return str;
    }

    return parsed;
  }
};
export { typeCast };
