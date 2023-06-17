import { join, lowerCase } from '@almaclaine/string';
import { map } from '@almaclaine/array';
import type { DashJoined } from '../types';
import { lowerCaseLiteral } from './utils';

function generateConstructPrefix<T extends string>(prefix: T): Lowercase<T> {
  return lowerCaseLiteral(prefix);
}

function generateConstructName(prefix: string, ...args: string[]) {
  return join('-', generateConstructPrefix(prefix), ...map(args, lowerCase));
}

function generateConstructNameLiteral<T extends string, K extends string>(
  valT: T,
  valK: K
): Lowercase<DashJoined<T, K>> {
  return `${lowerCaseLiteral(valT)}-${lowerCaseLiteral(valK)}`;
}

function generateQueueStackName<T extends string>(
  prefix: T
): Lowercase<DashJoined<T, 'queue'>> {
  return generateConstructNameLiteral(prefix, 'queue');
}

function generateS3StackName<T extends string>(
  prefix: T
): Lowercase<DashJoined<T, 's3'>> {
  return generateConstructNameLiteral(prefix, 's3');
}

function generateTableStackName<T extends string>(
  prefix: T
): Lowercase<DashJoined<T, 'table'>> {
  return generateConstructNameLiteral(prefix, 'table');
}

function generateUserStackName<T extends string>(
  prefix: T
): Lowercase<DashJoined<T, 'user'>> {
  return generateConstructNameLiteral(prefix, 'user');
}

function generateAuthStackName<T extends string>(
  prefix: T
): Lowercase<DashJoined<T, 'auth'>> {
  return generateConstructNameLiteral(prefix, 'auth');
}

export {
  lowerCaseLiteral,
  generateConstructNameLiteral,
  generateConstructPrefix,
  generateConstructName,
  generateQueueStackName,
  generateS3StackName,
  generateTableStackName,
  generateUserStackName,
  generateAuthStackName,
};
