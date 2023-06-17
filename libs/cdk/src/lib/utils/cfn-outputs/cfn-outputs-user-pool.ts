import { concatLiteral } from '../utils';

function generateCfnUserPoolName<T extends string>(pre: T) {
  return concatLiteral(pre, 'UserPoolName');
}

function generateCfnUserPoolClientName<T extends string>(pre: T) {
  return concatLiteral(pre, 'UserPoolClientName');
}

export { generateCfnUserPoolName, generateCfnUserPoolClientName };
