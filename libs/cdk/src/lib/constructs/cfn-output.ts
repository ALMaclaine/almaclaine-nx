import { concatStage } from '../utils/cfn-outputs/cfn-outputs-utils';
import { CfnOutput as CDKCfnOutput } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { Tags } from '../utils/tags';

type CfnOutputOptions = {
  value: string;
  name: string;
  scope: Construct;
};

class CfnOutput {
  static createOutput(options: CfnOutputOptions) {
    const { value, name, scope } = options;
    const stage = Tags.getStage(scope);
    new CDKCfnOutput(scope, concatStage(name, stage), {
      value,
    });
  }

  static of(options: CfnOutputOptions) {
    return this.createOutput(options);
  }
}

export { CfnOutput };
