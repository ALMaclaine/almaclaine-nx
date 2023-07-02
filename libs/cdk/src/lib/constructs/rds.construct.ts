import { Construct } from 'constructs';
import { DatabaseInstance, DatabaseInstanceProps } from 'aws-cdk-lib/aws-rds';
import { Tags } from '../utils/tags';

type RDSConstructProps<StackName extends string> = DatabaseInstanceProps & {
  stackName: StackName;
};

class RDSConstruct<StackName extends string> extends Construct {
  private readonly scope: Construct;

  private _database?: DatabaseInstance;

  get database(): DatabaseInstance {
    if (!this._database) {
      throw Error('Database not initialized');
    }

    return this._database;
  }

  constructor(
    scope: Construct,
    {
      stackName,
      ...props
    }: RDSConstructProps<StackName>
  ) {
    super(scope, stackName);
    this.scope = scope;

    this._database = new DatabaseInstance(this.scope, stackName, props);
  }
}

export { RDSConstruct };
