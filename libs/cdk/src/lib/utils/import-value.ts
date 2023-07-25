import { Fn } from 'aws-cdk-lib';
import type { CfnOutputNameGenerator } from './cfn-outputs/cfn-output-name-generator';

function importValue(output: string) {
  return Fn.importValue(output);
}

function importVercelUser<UserName extends string>(
  vercelUser: ReturnType<typeof CfnOutputNameGenerator.vercelServerUserArn>
) {
  return importValue(vercelUser);
}

export { importValue, importVercelUser };
