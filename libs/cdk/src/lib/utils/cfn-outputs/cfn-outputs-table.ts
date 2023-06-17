import { concatArn, concatName, concatTable } from './cfn-outputs-utils';

function generateCfnTableName<T extends string>(pre: T) {
  return concatName(concatTable(pre));
}

function generateCfnTableArn<T extends string>(pre: T) {
  return concatArn(concatTable(pre));
}

export { generateCfnTableName, generateCfnTableArn };
