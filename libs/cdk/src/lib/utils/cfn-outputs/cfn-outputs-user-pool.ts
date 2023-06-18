import { concatLiteral } from '../utils';

function generateCfnUserPoolName<Name extends string>(pre: Name) {
  return concatLiteral(pre, 'UserPoolName');
}

function generateCfnUserPoolClientName<Name extends string>(pre: Name) {
  return concatLiteral(pre, 'UserPoolClientName');
}

export { generateCfnUserPoolName, generateCfnUserPoolClientName };
