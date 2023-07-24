import { concatLiteral, upperCaseLiteral } from './utils';

function generateTableStackConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_TABLE_STACK');
}

type GenerateTableStackConfigName = ReturnType<
  typeof generateTableStackConfigName
>;

function generateUserStackConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_USER_STACK');
}

type GenerateUserStackConfigName = ReturnType<
  typeof generateUserStackConfigName
>;

function generateTableOutputNameConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_TABLE_OUTPUT_NAME');
}

type GenerateTableOutputNameConfigName = ReturnType<
  typeof generateTableOutputNameConfigName
>;

function generateTableArnConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_TABLE_ARN');
}

type GenerateTableArnConfigName = ReturnType<typeof generateTableArnConfigName>;

function generateTableNameConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_TABLE_NAME');
}

type GenerateTableNameConfigName = ReturnType<
  typeof generateTableNameConfigName
>;

function generateUserNameConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_USER_NAME');
}

type GenerateUserNameConfigName = ReturnType<typeof generateUserNameConfigName>;

function generateUserArnConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_USER_ARN');
}

type GenerateUserArnConfigName = ReturnType<typeof generateUserArnConfigName>;

function generateUserAccessKeySecretConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_USER_ACCESS_KEY_SECRET');
}

type GenerateUserAccessKeySecretConfigName = ReturnType<
  typeof generateUserAccessKeySecretConfigName
>;

function generateUserAccessKeyIdConfigName<StackName extends string>(
  stackName: StackName
) {
  return concatLiteral(upperCaseLiteral(stackName), '_USER_ACCESS_KEY_ID');
}

type GenerateUserAccessKeyIdConfigName = ReturnType<
  typeof generateUserAccessKeyIdConfigName
>;

export {
  generateTableStackConfigName,
  generateUserStackConfigName,
  generateTableOutputNameConfigName,
  generateTableArnConfigName,
  generateTableNameConfigName,
  generateUserNameConfigName,
  generateUserArnConfigName,
  generateUserAccessKeySecretConfigName,
  generateUserAccessKeyIdConfigName,
};

export type {
  GenerateTableStackConfigName,
  GenerateUserStackConfigName,
  GenerateTableOutputNameConfigName,
  GenerateTableArnConfigName,
  GenerateTableNameConfigName,
  GenerateUserNameConfigName,
  GenerateUserArnConfigName,
  GenerateUserAccessKeySecretConfigName,
  GenerateUserAccessKeyIdConfigName,
};
