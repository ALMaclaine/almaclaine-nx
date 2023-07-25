import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import type { GlobalSecondaryIndexProps } from 'aws-cdk-lib/aws-dynamodb';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { DYNAMO_PRIMARY_KEY_NAME, DYNAMO_SORT_KEY_NAME } from '../constants';
import type { ConstructDefaultTypes } from '../types';
import {
  ConstructEnum,
  ConstructNameGenerator,
} from '../utils/generate-construct-names';
import type { ConstructNameLiteral } from '../types';
import { Tags } from '../utils/tags';
import type { IGrantable } from 'aws-cdk-lib/aws-iam';
import { CfnOutput } from './cfn-output';
import type {
  CfnTableArn,
  CfnTableName,
} from '../utils/cfn-outputs/cfn-outputs-table';

type GsiOptions =
  | { gsiCount: number }
  | { gsiProps: GlobalSecondaryIndexProps[] };

type TableOutputNames = {
  tableOutputName?: CfnTableName;
  tableArn?: CfnTableArn;
};

type GrantType = {
  write?: IGrantable[];
  read?: IGrantable[];
  readWrite?: IGrantable[];
};

type TableConstructOptions<
  StackName extends string,
  TableName extends CfnTableName
> = ConstructDefaultTypes<StackName> & {
  tableName: TableName;
  gsi?: GsiOptions;
  outputNames?: TableOutputNames;
  grants?: GrantType;
};

class TableConstruct<
  StackName extends string,
  TableName extends CfnTableName
> extends Construct {
  private readonly scope: Construct;

  private _table?: Table;

  private readonly name: ConstructNameLiteral<StackName, TableName, 'dynamodb'>;
  private readonly prod: boolean;
  private _gsiCount = 0;

  get gsiCount(): number {
    return this._gsiCount;
  }

  get table(): Table {
    if (!this._table) {
      throw Error('Table not initialized');
    }

    return this._table;
  }

  constructor(
    scope: Construct,
    {
      stackName,
      tableName,
      gsi,
      outputNames,
      grants,
    }: TableConstructOptions<StackName, TableName>
  ) {
    super(scope, stackName);
    this.prod = Tags.isProd(scope);
    this.scope = scope;

    const cng = ConstructNameGenerator.of(stackName);
    this.name = cng.generateConstructName(tableName, ConstructEnum.dynamodb);

    this.createTable();
    gsi && this.handleAddGsi(gsi);
    outputNames && this.handleOutputNames(scope, outputNames);
    grants && this.handleAddGrants(grants);
  }

  handleAddGrants(grants: GrantType) {
    grants.write && this.grantWriteDataUsers(grants.write);
    grants.read && this.grantReadDataUsers(grants.read);
    grants.readWrite && this.grantReadWriteDataUsers(grants.readWrite);
  }

  private handleOutputNames(scope: Construct, outputNames: TableOutputNames) {
    if (outputNames.tableOutputName) {
      this.createOutputName(scope, outputNames.tableOutputName);
    }

    if (outputNames.tableArn) {
      this.createOutputArn(scope, outputNames.tableArn);
    }
  }

  private handleAddGsi(gsi: GsiOptions) {
    if ('gsiCount' in gsi) {
      if (gsi.gsiCount > 5) {
        throw Error('Cannot create more than 5 GSIs');
      } else if (gsi.gsiCount < 1) {
        throw Error('Cannot create less than 1 GSI');
      } else {
        for (let i = 0; i < gsi.gsiCount; i++) {
          this.addStandardGlobalSecondaryIndex();
        }
      }
    } else {
      gsi.gsiProps.forEach((props) => {
        this.addGlobalSecondaryIndex(props);
      });
    }
  }

  private createTable() {
    this._table = new Table(this.scope, this.name, {
      partitionKey: {
        name: DYNAMO_PRIMARY_KEY_NAME,
        type: AttributeType.STRING,
      },
      sortKey: { name: DYNAMO_SORT_KEY_NAME, type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      tableName: this.name,
      removalPolicy: this.prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    });
  }

  grantReadDataUser(user: IGrantable) {
    this.table.grantReadData(user);
  }

  grantReadDataUsers(user: IGrantable[]) {
    user.forEach((u) => this.grantReadDataUser(u));
  }

  grantReadWriteDataUser(user: IGrantable) {
    this.table.grantReadWriteData(user);
  }

  grantReadWriteDataUsers(user: IGrantable[]) {
    user.forEach((u) => this.grantReadWriteDataUser(u));
  }

  grantFullAccessUser(user: IGrantable) {
    this.table.grantFullAccess(user);
  }

  grantFullAccessUsers(user: IGrantable[]) {
    user.forEach((u) => this.grantFullAccessUser(u));
  }

  grantWriteDataUser(user: IGrantable) {
    this.table.grantWriteData(user);
  }

  grantWriteDataUsers(user: IGrantable[]) {
    user.forEach((u) => this.table.grantWriteData(u));
  }

  addGlobalSecondaryIndex(props: GlobalSecondaryIndexProps) {
    this.table.addGlobalSecondaryIndex(props);
  }

  createOutputArn(scope: Construct, tableArn: CfnTableArn) {
    CfnOutput.createOutput(scope, {
      value: this.table.tableArn,
      name: tableArn,
    });
  }

  createOutputName(scope: Construct, tableName: CfnTableName) {
    CfnOutput.createOutput(scope, {
      value: this.table.tableName,
      name: tableName,
    });
  }

  addStandardGlobalSecondaryIndex() {
    const count = this._gsiCount + 1;
    this.table.addGlobalSecondaryIndex({
      indexName: `gsi${count}-pk-gsi${count}-sk-index`,
      partitionKey: {
        name: `gsi${count}-pk`,
        type: AttributeType.STRING,
      },
      sortKey: {
        name: `gsi${count}-sk`,
        type: AttributeType.STRING,
      },
    });
    this._gsiCount = count;
  }

  static of<StackName extends string, TableName extends CfnTableName>(
    scope: Construct,
    props: TableConstructOptions<StackName, TableName>
  ) {
    return new TableConstruct(scope, props);
  }
}

export { TableConstruct };
export type { TableConstructOptions };
