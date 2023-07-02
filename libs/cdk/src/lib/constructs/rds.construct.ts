import { Construct } from 'constructs';
import { DatabaseInstance, DatabaseInstanceProps } from 'aws-cdk-lib/aws-rds';
import { Tags } from '../utils/tags';

type RDSConstructProps<StackName extends string> = DatabaseInstanceProps & {
  stackName: StackName;
  engine: string;
  version: string;
  instanceType: string;
  storageType: string;
  allocatedStorage: number;
};

/**
 * The RDSConstruct class is a construct for AWS CDK to create an RDS database instance.
 * It takes in a scope, stack name, and properties for the database instance.
 * The database instance can be accessed through the database getter.
 */
class RDSConstruct<StackName extends string> extends Construct {
  // The scope in which this construct is defined
  private readonly scope: Construct;

  // The DatabaseInstance that this construct wraps
  private _database?: DatabaseInstance;

  /**
   * Getter for the database instance.
   * Throws an error if the database has not been initialized.
   */
  get database(): DatabaseInstance {
    if (!this._database) {
      throw Error('Database not initialized');
    }

    return this._database;
  }

  /**
   * Constructor for the RDSConstruct class.
   * Initializes the database instance with the given properties.
   */
  constructor(
    scope: Construct,
    {
      stackName,
      ...props
    }: RDSConstructProps<StackName>
  ) {
    super(scope, stackName);
    this.scope = scope;
    this._database = new DatabaseInstance(this.scope, stackName, {
      ...props,
      engine: props.engine,
      version: props.version,
      instanceType: props.instanceType,
      storageType: props.storageType,
      allocatedStorage: props.allocatedStorage,
    });
  }
}

export { RDSConstruct };

