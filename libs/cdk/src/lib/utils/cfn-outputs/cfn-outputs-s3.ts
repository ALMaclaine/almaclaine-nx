import { concatArn, concatBucket, concatName } from './cfn-outputs-utils';

function generateCfnS3BucketName(pre: string) {
  return concatName(concatBucket(pre));
}

function generateCfnS3BucketArn(pre: string) {
  return concatArn(concatBucket(pre));
}

export { generateCfnS3BucketName, generateCfnS3BucketArn };
