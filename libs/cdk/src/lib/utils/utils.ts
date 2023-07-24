import { lowerCase, upperCase } from '@almaclaine/string';
import type { JoinedString } from '../types';
import { cast } from '@almaclaine/types';

function lowerCaseLiteral<T extends string>(str: T): Lowercase<T> {
  return cast(lowerCase(str));
}

function upperCaseLiteral<T extends string>(str: T): Uppercase<T> {
  return cast(upperCase(str));
}

function concatLiteral<T extends string, K extends string>(
  valT: T,
  valK: K
): JoinedString<T, K> {
  return `${valT}${valK}`;
}

export { lowerCaseLiteral, concatLiteral, upperCaseLiteral };
