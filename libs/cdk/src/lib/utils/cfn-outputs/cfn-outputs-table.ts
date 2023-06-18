import { concatArn, concatName, concatTable } from './cfn-outputs-utils';

function generateCfnTableName<Name extends string>(pre: Name) {
  return concatName(concatTable(pre));
}

function generateCfnTableArn<Name extends string>(pre: Name) {
  return concatArn(concatTable(pre));
}

export { generateCfnTableName, generateCfnTableArn };
