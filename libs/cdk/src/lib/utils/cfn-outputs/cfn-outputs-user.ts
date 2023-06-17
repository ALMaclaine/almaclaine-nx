import { concatArn, concatName, concatUser } from './cfn-outputs-utils';
import { concat } from '@almaclaine/string';

function generateCfnVercelServerUserName<T extends string>(pre: T) {
  return concatName(concatUser(concat(pre, 'VercelServer')));
}

function generateCfnVercelServerUserArn<T extends string>(pre: T) {
  return concatArn(concatUser(concat(pre, 'VercelServer')));
}

export { generateCfnVercelServerUserName, generateCfnVercelServerUserArn };
