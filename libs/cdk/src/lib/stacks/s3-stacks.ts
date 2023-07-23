import type { Stack } from '../stack';
import { merge } from 'moderndash';
import type { CfnS3BucketName } from '../utils/cfn-outputs/cfn-outputs-s3';
import type { S3ConstructOptions } from '../constructs/s3.construct';
import { S3Construct } from '../constructs/s3.construct';

type CreateBucketStackOptions<
  StackName extends string,
  BucketName extends CfnS3BucketName
> = Omit<S3ConstructOptions<StackName, BucketName>, 'stackName'>;

function createBucketStack<
  StackName extends string,
  BucketName extends CfnS3BucketName
>(stack: Stack, props: CreateBucketStackOptions<StackName, BucketName>) {
  S3Construct.of(
    stack.stack,
    merge(props, {
      stackName: stack.name,
    })
  );
}

export { createBucketStack };
export type { CreateBucketStackOptions };
