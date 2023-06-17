import { concat } from '@almaclaine/string';

function generateCfnUserPoolName<T extends string>(pre: T) {
  return concat(pre, 'UserPoolName');
}

function generateCfnUserPoolClientName<T extends string>(pre: T) {
  return concat(pre, 'UserPoolClientName');
}

export { generateCfnUserPoolName, generateCfnUserPoolClientName };
