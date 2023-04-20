import { concatArn, concatName, concatTable } from './cfn-outputs-utils';

function generateCfnTableName(pre: string) {
  return concatName(concatTable(pre));
}

function generateCfnTableArn(pre: string) {
  return concatArn(concatTable(pre));
}

export { generateCfnTableName, generateCfnTableArn };
