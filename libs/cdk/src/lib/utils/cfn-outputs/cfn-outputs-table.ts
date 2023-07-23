import { concatArn, concatName, concatTable } from './cfn-outputs-utils';

function generateCfnTableName<Name extends string>(pre: Name) {
  return concatName(concatTable(pre));
}

function generateCfnTableArn<Name extends string>(pre: Name) {
  return concatArn(concatTable(pre));
}

type CfnTableName = ReturnType<typeof generateCfnTableName>;
type CfnTableArn = ReturnType<typeof generateCfnTableArn>;

export { generateCfnTableName, generateCfnTableArn };
export type { CfnTableName, CfnTableArn };
