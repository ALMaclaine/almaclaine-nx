import type { Construct } from 'constructs';
import { User } from 'aws-cdk-lib/aws-iam';
import { importVercelUser } from './import-value';
import type { CfnOutputNameGenerator } from './cfn-outputs/cfn-output-name-generator';

function getUser(scope: Construct, id: string, user: string) {
  return User.fromUserArn(scope, id, user);
}

function getVercelUser(
  scope: Construct,
  vercelUser: ReturnType<typeof CfnOutputNameGenerator.vercelServerUserArn>
) {
  const user = importVercelUser(vercelUser);
  return getUser(scope, 'VercelUser', user);
}

export { getUser, getVercelUser };
