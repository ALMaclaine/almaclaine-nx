import { lowerCase } from '@almaclaine/string';
import type { JoinedString } from '../types';

function lowerCaseLiteral<T extends string>(str: T): Lowercase<T> {
  return lowerCase(str) as Lowercase<T>;
}

function concatLiteral<T extends string, K extends string>(
  valT: T,
  valK: K
): JoinedString<T, K> {
  return `${valT}${valK}`;
}

export { lowerCaseLiteral, concatLiteral };
