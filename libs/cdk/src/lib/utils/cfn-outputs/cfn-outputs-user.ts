import {
  concatAccessKeyId,
  concatArn,
  concatName,
  concatSecretAccessKeyId,
  concatUser,
} from './cfn-outputs-utils';
import { concatLiteral } from '../utils';

function generateCfnUserName<Name extends string>(pre: Name) {
  return concatName(concatUser(pre));
}

type CfnUserName = ReturnType<typeof generateCfnUserName>;

function generateCfnUserArn<Name extends string>(pre: Name) {
  return concatArn(concatUser(pre));
}

type CfnUserArn = ReturnType<typeof generateCfnUserArn>;

function generateCfnUserAccessKeyId<Name extends string>(pre: Name) {
  return concatAccessKeyId(concatUser(pre));
}

type CfnUserAccessKeyId = ReturnType<typeof generateCfnUserAccessKeyId>;

function generateCfnUserSecretAccessKeyId<Name extends string>(pre: Name) {
  return concatSecretAccessKeyId(concatUser(pre));
}

type CfnUserSecretAccessKeyId = ReturnType<
  typeof generateCfnUserSecretAccessKeyId
>;

function generateCfnVercelServerUserName<Name extends string>(pre: Name) {
  return generateCfnUserName(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserName = ReturnType<
  typeof generateCfnVercelServerUserName
>;

function generateCfnVercelServerUserArn<Name extends string>(pre: Name) {
  return generateCfnUserArn(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserArn = ReturnType<typeof generateCfnVercelServerUserArn>;

function generateCfnVercelServerUserAccessKeyId<Name extends string>(
  pre: Name
) {
  return generateCfnUserAccessKeyId(concatLiteral(pre, 'VercelServer'));
}

type CfnVercelServerUserAccessKeyId = ReturnType<
  typeof generateCfnVercelServerUserAccessKeyId
>;

function generateCfnVercelServerUserSecretAccessKeyId<Name extends string>(
  pre: Name
) {
  return concatName(
    generateCfnUserSecretAccessKeyId(concatLiteral(pre, 'VercelServer'))
  );
}

type CfnVercelServerUserSecretAccessKeyId = ReturnType<
  typeof generateCfnVercelServerUserSecretAccessKeyId
>;

export {
  generateCfnUserAccessKeyId,
  generateCfnUserArn,
  generateCfnUserName,
  generateCfnUserSecretAccessKeyId,
  generateCfnVercelServerUserAccessKeyId,
  generateCfnVercelServerUserArn,
  generateCfnVercelServerUserName,
  generateCfnVercelServerUserSecretAccessKeyId,
};

export type {
  CfnUserAccessKeyId,
  CfnUserArn,
  CfnUserName,
  CfnUserSecretAccessKeyId,
  CfnVercelServerUserAccessKeyId,
  CfnVercelServerUserArn,
  CfnVercelServerUserName,
  CfnVercelServerUserSecretAccessKeyId,
};
