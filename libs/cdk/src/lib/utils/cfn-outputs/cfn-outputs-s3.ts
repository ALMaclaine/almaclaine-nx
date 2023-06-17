import { concatArn, concatBucket, concatName } from './cfn-outputs-utils';

function generateCfnS3BucketName<T extends string>(pre: T) {
  return concatName(concatBucket(pre));
}

function generateCfnS3BucketArn<T extends string>(pre: T) {
  return concatArn(concatBucket(pre));
}

export { generateCfnS3BucketName, generateCfnS3BucketArn };
