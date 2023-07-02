import { Construct } from 'constructs';
import { DatabaseInstance, DatabaseInstanceProps, DatabaseInstanceEngine } from 'aws-cdk-lib/aws-rds';

type RdsConstructProps = DatabaseInstanceProps & {
  databaseName: string;
};

class RdsConstruct extends Construct {
  private readonly database: DatabaseInstance;

  constructor(scope: Construct, id: string, props: RdsConstructProps) {
    super(scope, id);

    this.database = new DatabaseInstance(this, 'Database', props);
  }
}


