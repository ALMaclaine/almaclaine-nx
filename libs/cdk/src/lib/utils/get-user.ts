import type { Construct } from 'constructs';
import { User } from 'aws-cdk-lib/aws-iam';
import type { CfnVercelServerUserArnType } from './cfn-outputs/cfn-outputs-user';
import { importVercelUser } from './import-value';

function getUser(scope: Construct, id: string, user: string) {
  return User.fromUserArn(scope, id, user);
}

function getVercelUser(
  scope: Construct,
  vercelUser: CfnVercelServerUserArnType
) {
  const user = importVercelUser(vercelUser);
  return getUser(scope, 'VercelUser', user);
}

export { getUser, getVercelUser };
