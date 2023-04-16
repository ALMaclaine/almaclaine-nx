import type { App, StackProps } from 'aws-cdk-lib';
import { Stack, CfnOutput } from 'aws-cdk-lib';

import { STAGES, TAG_STAGE } from '../constants';
import { Tags } from '../utils/tags';
import { getStackNameFromProps } from '../utils/get-stack-name';
import { UserConstruct } from '../constructs/user';
import { generateCfnOutputName } from '../utils/cfn-output-name';

type UserStackProps = StackProps & {
  userName: string;
  userArn: string;
};

class UserStack extends Stack {
  constructor(scope: App, id: string, props: UserStackProps) {
    const stackName = getStackNameFromProps(id, props);
    super(scope, stackName, props);

    const tagManager = new Tags(this);
    const stage = tagManager.getOrError(TAG_STAGE);

    const { userName, userArn } = props || {};
    const vercelServerUser = new UserConstruct(this, {
      prod: stage === STAGES.PROD,
      stackName,
      userName,
    });

    new CfnOutput(this, generateCfnOutputName(userArn, stage), {
      value: vercelServerUser.user.userArn,
      exportName: userArn,
    });
  }
}

export { UserStack };
export type { UserStackProps };
