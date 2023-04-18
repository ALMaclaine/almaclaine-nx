import { generateArn, generateName, prefix } from './cfn-outputs-utils';

function generateCfnVercelServerUserName(pre: string) {
  return generateName(prefix(pre, 'VercelServerUser'));
}

function generateVercelServerUserArn(pre: string) {
  return generateArn(prefix(pre, 'VercelServerUser'));
}

export { generateCfnVercelServerUserName, generateVercelServerUserArn };
