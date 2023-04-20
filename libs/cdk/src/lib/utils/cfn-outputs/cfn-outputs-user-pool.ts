import { concat } from '@almaclaine/string';

function generateCfnUserPoolName(pre: string) {
  return concat(pre, 'UserPoolName');
}

function generateCfnUserPoolClientName(pre: string) {
  return concat(pre, 'UserPoolClientName');
}

export { generateCfnUserPoolName, generateCfnUserPoolClientName };
