import type { App, StackProps } from 'aws-cdk-lib';
import { Stack, CfnOutput } from 'aws-cdk-lib';
import { STAGES, TAG_STAGE } from '../constants';
import { getStackNameFromProps } from '../utils/get-stack-name';
import { Tags } from '../utils/tags';
import { TableConstruct } from '../constructs/table';
import { generateCfnOutputName } from '../utils/cfn-output-name';

type TableStackProps = StackProps & {
  tableName: string;
  tableArn: string;
};

class TableStack extends Stack {
  constructor(scope: App, id: string, props: TableStackProps) {
    const stackName = getStackNameFromProps(id, props);
    super(scope, stackName, props);

    const tagManager = new Tags(this);
    const stage = tagManager.getOrError(TAG_STAGE);

    const table = new TableConstruct(this, stackName, {
      prod: stage === STAGES.PROD,
    });

    const { tableName, tableArn } = props;
    new CfnOutput(this, generateCfnOutputName(tableName, stage), {
      value: table.table.tableArn,
    });

    new CfnOutput(this, generateCfnOutputName(tableArn, stage), {
      value: table.table.tableName,
    });
  }
}

export { TableStack };
export type { TableStackProps };
