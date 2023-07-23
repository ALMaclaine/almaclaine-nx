import { concatArn, concatName, concatUser } from './cfn-outputs-utils';
import { concatLiteral } from '../utils';

function generateCfnUserName<Name extends string>(pre: Name) {
  return concatName(concatUser(pre));
}

type CfnUserName = ReturnType<typeof generateCfnUserName>;

function generateCfnVercelServerUserName<Name extends string>(pre: Name) {
  return generateCfnUserName(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserName = ReturnType<
  typeof generateCfnVercelServerUserName
>;

function generateCfnUserArn<Name extends string>(pre: Name) {
  return concatArn(concatUser(pre));
}

type CfnUserArn = ReturnType<typeof generateCfnUserArn>;

function generateCfnVercelServerUserArn<Name extends string>(pre: Name) {
  return generateCfnUserArn(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserArn = ReturnType<typeof generateCfnVercelServerUserArn>;

function generateCfnVercelServerUserAccessKeyId<Name extends string>(
  pre: Name
) {
  return generateCfnUserName(concatLiteral(pre, 'VercelServerAccessKeyId'));
}

type CfnVercelServerUserAccessKeyId = ReturnType<
  typeof generateCfnVercelServerUserAccessKeyId
>;

function generateCfnVercelServerUserSecretAccessKeyId<Name extends string>(
  pre: Name
) {
  return concatName(
    concatUser(concatLiteral(pre, 'VercelServerSecretAccessKeyId'))
  );
}

type CfnVercelServerUserSecretAccessKeyId = ReturnType<
  typeof generateCfnVercelServerUserSecretAccessKeyId
>;

export {
  generateCfnUserName,
  generateCfnVercelServerUserName,
  generateCfnVercelServerUserArn,
  generateCfnVercelServerUserAccessKeyId,
  generateCfnVercelServerUserSecretAccessKeyId,
};

export type {
  CfnVercelServerUserArn,
  CfnVercelServerUserName,
  CfnVercelServerUserAccessKeyId,
  CfnVercelServerUserSecretAccessKeyId,
  CfnUserName,
  CfnUserArn,
};
