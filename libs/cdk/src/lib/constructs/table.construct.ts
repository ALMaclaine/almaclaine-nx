import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import {
  DYNAMO_PRIMARY_KEY_NAME,
  DYNAMO_SORT_KEY_NAME,
  isProd,
} from '../constants';
import type { ConstructDefaultTypes } from '../types';
import { generateTableName } from '../utils/generate-construct-names';
import type { ConstructNameLiteral } from '../types';
import { Tags } from '../utils/tags';

type TableConstructProps<
  StackName extends string,
  TableName extends string
> = ConstructDefaultTypes<StackName> & {
  tableName: TableName;
};

class TableConstruct<
  StackName extends string,
  TableName extends string
> extends Construct {
  private readonly scope: Construct;

  private _table?: Table;

  private readonly name: ConstructNameLiteral<StackName, TableName, 'dynamodb'>;
  private readonly prod: boolean;

  get table(): Table {
    if (!this._table) {
      throw Error('Table not initialized');
    }

    return this._table;
  }

  constructor(
    scope: Construct,
    { stackName, tableName }: TableConstructProps<StackName, TableName>
  ) {
    super(scope, stackName);
    this.prod = Tags.isProd(scope);
    this.scope = scope;
    this.name = generateTableName(stackName, tableName);

    this.initialize();
  }

  private initialize() {
    this.createTable();
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

  static of<StackName extends string, TableName extends string>(
    scope: Construct,
    props: TableConstructProps<StackName, TableName>
  ) {
    return new TableConstruct(scope, props);
  }
}

export { TableConstruct };
export type { TableConstructProps };
