import { concat } from '@almaclaine/string';

function generateUserPoolName(pre: string) {
  return concat(pre, 'UserPoolName');
}

function generateUserPoolClientName(pre: string) {
  return concat(pre, 'UserPoolClientName');
}

export { generateUserPoolName, generateUserPoolClientName };
