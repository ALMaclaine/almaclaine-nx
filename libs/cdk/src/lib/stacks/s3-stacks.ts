import type { Stack } from '../stack';
import { merge } from 'moderndash';
import type { S3ConstructOptions } from '../constructs/s3.construct';
import { S3Construct } from '../constructs/s3.construct';

type CreateS3StackOptions<
  StackName extends string,
  BucketName extends string
> = Omit<S3ConstructOptions<StackName, BucketName>, 'stackName'>;

function createS3Stack<StackName extends string, BucketName extends string>(
  stack: Stack,
  props: CreateS3StackOptions<StackName, BucketName>
) {
  S3Construct.of(
    stack.stack,
    merge(props, {
      stackName: stack.name,
    })
  );
}

export { createS3Stack };
export type { CreateS3StackOptions };
