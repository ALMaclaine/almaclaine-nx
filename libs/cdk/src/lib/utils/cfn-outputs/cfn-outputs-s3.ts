import { concatArn, concatBucket, concatName } from './cfn-outputs-utils';

function generateCfnS3BucketName<Name extends string>(pre: Name) {
  return concatName(concatBucket(pre));
}

type CfnS3BucketNameType = ReturnType<typeof generateCfnS3BucketName>;

function generateCfnS3BucketArn<Name extends string>(pre: Name) {
  return concatArn(concatBucket(pre));
}

type CfnS3BucketArnType = ReturnType<typeof generateCfnS3BucketArn>;

export type { CfnS3BucketArnType, CfnS3BucketNameType };
export { generateCfnS3BucketName, generateCfnS3BucketArn };
