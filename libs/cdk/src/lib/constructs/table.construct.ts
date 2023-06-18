import { RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { DYNAMO_PRIMARY_KEY_NAME, DYNAMO_SORT_KEY_NAME } from '../constants';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import {
  generateConstructName,
  generateConstructNameLiteral,
} from '../utils/generate-construct-names';

type TableConstructProps<StackName extends string> =
  ConstructDefaultTypes<StackName>;

function generateTableName(name: string): string {
  return generateConstructName(name, 'dynamodb');
}

function generateTableNameLiteral<StackName extends string>(
  stackName: StackName
): Lowercase<DashJoined<StackName, 'dynamodb'>> {
  return generateConstructNameLiteral(stackName, 'dynamodb');
}

class TableConstruct<StackName extends string> extends Construct {
  private readonly scope: Construct;

  private _table?: Table;

  private readonly name: Lowercase<DashJoined<StackName, 'dynamodb'>>;
  private readonly prod: boolean;

  get table(): Table {
    if (!this._table) {
      throw Error('Table not initialized');
    }

    return this._table;
  }

  constructor(
    scope: Construct,
    { stackName, prod }: TableConstructProps<StackName>
  ) {
    super(scope, stackName);
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = generateTableNameLiteral(stackName);
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
}

export { TableConstruct, generateTableName, generateTableNameLiteral };
export type { TableConstructProps };