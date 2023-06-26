import { concatStage } from '../utils/cfn-outputs/cfn-outputs-utils';
import { CfnOutput as CDKCfnOutput } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { Tags } from '../utils/tags';

type CfnOutputOptions = {
  value: string;
  name: string;
};

class CfnOutput {
  static createOutput(scope: Construct, options: CfnOutputOptions) {
    const { value, name } = options;
    const stage = Tags.getStage(scope);
    new CDKCfnOutput(scope, concatStage(name, stage), {
      value,
    });
  }

  static of(scope: Construct, options: CfnOutputOptions) {
    return this.createOutput(scope, options);
  }
}

export { CfnOutput };
