import { generateArn, generateName, prefix } from './cfn-outputs-utils';

function generateCfnTableName(pre: string) {
  return generateName(prefix(pre, 'Table'));
}

function generateCfnTableArn(pre: string) {
  return generateArn(prefix(pre, 'Table'));
}

export { generateCfnTableName, generateCfnTableArn };
