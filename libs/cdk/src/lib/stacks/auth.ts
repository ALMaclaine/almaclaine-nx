import type { App, StackProps } from 'aws-cdk-lib';
import { Stack, CfnOutput } from 'aws-cdk-lib';
import { STAGES, TAG_STAGE } from '../constants';
import { getStackNameFromProps } from '../utils/get-stack-name';
import { CognitoConstruct } from '../constructs/cognito';
import { Tags } from '../utils/tags';
import { generateCfnOutputName } from '../utils/cfn-output-name';

type AuthStackProps = StackProps & {
  userPoolId: string;
  userPoolClientId: string;
};

class AuthStack extends Stack {
  constructor(scope: App, id: string, props: AuthStackProps) {
    const stackName = getStackNameFromProps(id, props);
    super(scope, stackName, props);

    const tagManager = new Tags(this);
    const stage = tagManager.getOrError(TAG_STAGE);

    const cognito = new CognitoConstruct(this, stackName, {
      prod: stage === STAGES.PROD,
    });

    const { userPoolId, userPoolClientId } = props;
    new CfnOutput(this, generateCfnOutputName(userPoolId, stage), {
      value: cognito.userPool.userPoolId,
    });

    new CfnOutput(this, generateCfnOutputName(userPoolClientId, stage), {
      value: cognito.userPoolClient.userPoolClientId,
    });
  }
}

export { AuthStack };
export type { AuthStackProps };
