import { Construct } from 'constructs';
import type { ConstructDefaultTypes } from '../types';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';
import { generateConstructName } from '../utils/generate-construct-names';

type S3ConstructOptions = ConstructDefaultTypes & {
  versioned?: boolean;
};

function generateS3Name(name: string): string {
  return generateConstructName(name, 'bucket');
}

class S3Construct extends Construct {
  private readonly scope: Construct;

  private _bucket?: Bucket;

  private readonly name: string;
  private readonly prod: boolean;
  private readonly versioned?: boolean;

  get bucket(): Bucket {
    if (!this._bucket) {
      throw Error('S3 Bucket not initialized');
    }

    return this._bucket;
  }

  constructor(scope: Construct, { name, prod, versioned }: S3ConstructOptions) {
    super(scope, name);
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = generateS3Name(name);
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
}

export { S3Construct, generateS3Name };
export type { S3ConstructOptions };
