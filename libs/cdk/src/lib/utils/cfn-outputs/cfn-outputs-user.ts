import { concatArn, concatName, concatUser } from './cfn-outputs-utils';
import { concatLiteral } from '../utils';

function generateCfnUserName<Name extends string>(pre: Name) {
  return concatName(concatUser(pre));
}

type CfnUserNameType = ReturnType<typeof generateCfnUserName>;

function generateCfnVercelServerUserName<Name extends string>(pre: Name) {
  return generateCfnUserName(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserNameType = ReturnType<
  typeof generateCfnVercelServerUserName
>;

function generateCfnUserArn<Name extends string>(pre: Name) {
  return concatArn(concatUser(pre));
}

type CfnUserArnType = ReturnType<typeof generateCfnUserArn>;

function generateCfnVercelServerUserArn<Name extends string>(pre: Name) {
  return generateCfnUserArn(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserArnType = ReturnType<
  typeof generateCfnVercelServerUserArn
>;

function generateCfnVercelServerUserAccessKeyId<Name extends string>(
  pre: Name
) {
  return generateCfnUserName(concatLiteral(pre, 'VercelServerAccessKeyId'));
}

type CfnVercelServerUserAccessKeyIdType = ReturnType<
  typeof generateCfnVercelServerUserAccessKeyId
>;

function generateCfnVercelServerUserSecretAccessKeyId<Name extends string>(
  pre: Name
) {
  return concatName(
    concatUser(concatLiteral(pre, 'VercelServerSecretAccessKeyId'))
  );
}

type CfnVercelServerUserSecretAccessKeyIdType = ReturnType<
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
  CfnVercelServerUserArnType,
  CfnVercelServerUserNameType,
  CfnVercelServerUserAccessKeyIdType,
  CfnVercelServerUserSecretAccessKeyIdType,
  CfnUserNameType,
  CfnUserArnType,
};
