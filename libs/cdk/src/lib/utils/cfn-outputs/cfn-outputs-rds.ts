import { concatName, concatArn } from './cfn-outputs-utils';

function generateCfnRDSInstanceIdentifier<Name extends string>(pre: Name) {
  return concatName(pre + 'RDSInstanceIdentifier');
}

function generateCfnRDSInstanceArn<Name extends string>(pre: Name) {
  return concatArn(pre + 'RDSInstanceArn');
}

export { generateCfnRDSInstanceIdentifier, generateCfnRDSInstanceArn };


