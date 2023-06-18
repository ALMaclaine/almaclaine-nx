import { Construct } from 'constructs';
import type { ConstructDefaultTypes, DashJoined } from '../types';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';
import { generateConstructNameLiteral } from '../utils/generate-construct-names';

type S3ConstructOptions<StackName extends string> =
  ConstructDefaultTypes<StackName> & {
    versioned?: boolean;
  };

function generateS3NameLiteral<StackName extends string>(
  stackName: StackName
): Lowercase<DashJoined<StackName, 'bucket'>> {
  return generateConstructNameLiteral(stackName, 'bucket');
}

class S3Construct<StackName extends string> extends Construct {
  private readonly scope: Construct;

  private _bucket?: Bucket;

  private readonly name: Lowercase<DashJoined<StackName, 'bucket'>>;
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
    { stackName, prod, versioned }: S3ConstructOptions<StackName>
  ) {
    super(scope, stackName);
    this.prod = prod ?? false;
    this.scope = scope;
    this.name = generateS3NameLiteral(stackName);
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

export { S3Construct, generateS3NameLiteral };
export type { S3ConstructOptions };
