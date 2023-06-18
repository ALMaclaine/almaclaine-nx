import { concatArn, concatName, concatUser } from './cfn-outputs-utils';
import { concatLiteral } from '../utils';

function generateCfnVercelServerUserName<Prefix extends string>(pre: Prefix) {
  return concatName(concatUser(concatLiteral(pre, 'VercelServer')));
}

function generateCfnVercelServerUserArn<Prefix extends string>(pre: Prefix) {
  return concatArn(concatUser(concatLiteral(pre, 'VercelServer')));
}

export { generateCfnVercelServerUserName, generateCfnVercelServerUserArn };
