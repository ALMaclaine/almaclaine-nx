import { concatArn, concatName, concatUser } from './cfn-outputs-utils';
import { concatLiteral } from '../utils';

function generateCfnVercelServerUserName<Name extends string>(pre: Name) {
  return concatName(concatUser(concatLiteral(pre, 'VercelServer')));
}

function generateCfnVercelServerUserArn<Name extends string>(pre: Name) {
  return concatArn(concatUser(concatLiteral(pre, 'VercelServer')));
}

export { generateCfnVercelServerUserName, generateCfnVercelServerUserArn };
