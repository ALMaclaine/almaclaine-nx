import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../types';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';
import {
  ConstructEnum,
  ConstructNameGenerator,
} from './utils/generate-construct-names';
import type { ConstructNameLiteral } from '../types';
import { Tags } from '../utils/tags';
import type { IGrantable } from 'aws-cdk-lib/aws-iam';
import { CfnOutput } from './cfn-output';
import type { CfnOutputNameGenerator } from '../utils/cfn-outputs/cfn-output-name-generator';

type S3OutputNames = {
  bucketOutputName?: ReturnType<typeof CfnOutputNameGenerator.s3BucketName>;
  bucketArn?: ReturnType<typeof CfnOutputNameGenerator.s3BucketArn>;
};

type GrantType = {
  write?: IGrantable[];
  read?: IGrantable[];
  readWrite?: IGrantable[];
};

type S3ConstructOptions<
  StackName extends string,
  BucketName extends string
> = ConstructDefaultTypes<StackName> & {
  versioned?: boolean;
  bucketName: BucketName;
  grants?: GrantType;
  outputNames?: S3OutputNames;
};

class S3Construct<
  StackName extends string,
  BucketName extends string
> extends Construct {
  private readonly scope: Construct;

  private _bucket?: Bucket;

  private readonly _name: ConstructNameLiteral<StackName, BucketName, 's3'>;
  private readonly prod: boolean;
  private readonly versioned?: boolean;

  get name(): ConstructNameLiteral<StackName, BucketName, 's3'> {
    return this._name;
  }

  get bucket(): Bucket {
    if (!this._bucket) {
      throw Error('S3 Bucket not initialized');
    }

    return this._bucket;
  }

  constructor(
    scope: Construct,
    {
      stackName,
      versioned,
      bucketName,
      outputNames,
      grants,
    }: S3ConstructOptions<StackName, BucketName>
  ) {
    super(scope, stackName);
    this.prod = Tags.isProd(scope);
    this.scope = scope;

    const cng = ConstructNameGenerator.of(stackName);
    this._name = cng.generateConstructName(bucketName, ConstructEnum.S3);
    this.versioned = versioned;
    this.createS3();
    outputNames && this.handleOutputs(outputNames);
    grants && this.handleGrants(grants);
  }

  handleOutputs(outputNames: S3OutputNames) {
    outputNames.bucketArn &&
      this.createOutputArn(this.scope, outputNames.bucketArn);
    outputNames.bucketOutputName &&
      this.createOutputName(this.scope, outputNames.bucketOutputName);
  }

  createOutputArn(
    scope: Construct,
    bucketArn: ReturnType<typeof CfnOutputNameGenerator.s3BucketArn>
  ) {
    CfnOutput.createOutput(scope, {
      value: this.bucket.bucketArn,
      name: bucketArn,
    });
  }

  createOutputName(
    scope: Construct,
    bucketName: ReturnType<typeof CfnOutputNameGenerator.s3BucketName>
  ) {
    CfnOutput.createOutput(scope, {
      value: this.bucket.bucketName,
      name: bucketName,
    });
  }

  handleGrants(grants: GrantType) {
    grants.read && this.grantReadDataUsers(grants.read);
    grants.write && this.grantWriteDataUsers(grants.write);
    grants.readWrite && this.grantReadWriteDataUsers(grants.readWrite);
  }

  grantReadWriteDataUser(user: IGrantable) {
    this.bucket.grantReadWrite(user);
  }

  grantReadWriteDataUsers(users: IGrantable[]) {
    users.forEach((user) => this.bucket.grantReadWrite(user));
  }

  grantReadDataUser(user: IGrantable) {
    this.bucket.grantRead(user);
  }

  grantReadDataUsers(users: IGrantable[]) {
    users.forEach((user) => this.bucket.grantRead(user));
  }

  grantWriteDataUser(user: IGrantable) {
    this.bucket.grantWrite(user);
  }

  grantWriteDataUsers(users: IGrantable[]) {
    users.forEach((user) => this.bucket.grantWrite(user));
  }

  private createS3() {
    this._bucket = new Bucket(this.scope, this._name, {
      bucketName: this._name,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: this.prod,
      versioned: this.versioned || this.prod,
      removalPolicy: this.prod ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    });
  }

  static of<StackName extends string, BucketName extends string>(
    scope: Construct,
    options: S3ConstructOptions<StackName, BucketName>
  ) {
    return new S3Construct(scope, options);
  }
}

export { S3Construct };
export type { S3ConstructOptions };
