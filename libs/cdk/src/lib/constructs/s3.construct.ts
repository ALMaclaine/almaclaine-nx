import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';
import { generateS3Name } from '../utils/generate-construct-names';
import type { ConstructNameLiteral } from '../types';
import { Tags } from '../utils/tags';

type S3ConstructOptions<
  StackName extends string,
  BucketName extends string
> = ConstructDefaultTypes<StackName> & {
  versioned?: boolean;
  bucketName: BucketName;
};

class S3Construct<
  StackName extends string,
  BucketName extends string
> extends Construct {
  private readonly scope: Construct;

  private _bucket?: Bucket;

  private readonly name: ConstructNameLiteral<StackName, BucketName, 's3'>;
  private readonly prod: boolean;
  private readonly versioned?: boolean;

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
    }: S3ConstructOptions<StackName, BucketName>
  ) {
    super(scope, stackName);
    this.prod = Tags.isProd(scope);
    this.scope = scope;
    this.name = generateS3Name(stackName, bucketName);
    this.versioned = versioned;
    this.initialize();
  }

  private initialize() {
    this.createS3();
  }

  private createS3() {
    this._bucket = new Bucket(this.scope, this.name, {
      bucketName: this.name,
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
