import { concatArn, concatName, concatUser } from './cfn-outputs-utils';
import { concat } from '@almaclaine/string';

function generateCfnVercelServerUserName(pre: string) {
  return concatName(concatUser(concat(pre, 'VercelServer')));
}

function generateCfnVercelServerUserArn(pre: string) {
  return concatArn(concatUser(concat(pre, 'VercelServer')));
}

export { generateCfnVercelServerUserName, generateCfnVercelServerUserArn };
