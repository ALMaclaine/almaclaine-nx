import { Construct } from 'constructs';
import { DatabaseInstance, DatabaseInstanceProps } from '@aws-cdk/aws-rds';

export class RdsDatabaseConstruct extends Construct {
  private readonly props: DatabaseInstanceProps;

  constructor(scope: Construct, id: string, props: DatabaseInstanceProps) {
    super(scope, id);
    this.props = props;
  }

  createDatabase() {
    new DatabaseInstance(this, 'Database', this.props);
  }

  // Define other methods for updating and deleting the database as needed
}

