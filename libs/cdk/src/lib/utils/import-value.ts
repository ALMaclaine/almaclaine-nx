import { Fn } from 'aws-cdk-lib';
import type { CfnVercelServerUserArn } from './cfn-outputs/cfn-outputs-user';

function importValue(output: string) {
  return Fn.importValue(output);
}

function importVercelUser(vercelUser: CfnVercelServerUserArn) {
  return importValue(vercelUser);
}

export { importValue, importVercelUser };
