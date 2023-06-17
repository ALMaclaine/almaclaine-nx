import { lowerCase } from '@almaclaine/string';

function lowerCaseLiteral<T extends string>(str: T): Lowercase<T> {
  return lowerCase(str) as Lowercase<T>;
}

export { lowerCaseLiteral };
