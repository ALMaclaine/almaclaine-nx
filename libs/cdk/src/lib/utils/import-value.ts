import { Fn } from 'aws-cdk-lib';
import type { CfnVercelServerUserArnType } from './cfn-outputs/cfn-outputs-user';

function importValue(output: string) {
  return Fn.importValue(output);
}

function importVercelUser(vercelUser: CfnVercelServerUserArnType) {
  return importValue(vercelUser);
}

export { importValue, importVercelUser };
