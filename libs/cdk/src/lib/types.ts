import { DatabaseInstanceProps } from 'aws-cdk-lib/aws-rds';

type RdsConstructProps = DatabaseInstanceProps & {
  databaseName: string;
};

export type {
  RdsConstructProps
};

