import { concatArn, concatBucket, concatName } from './cfn-outputs-utils';

function generateCfnS3BucketName<Name extends string>(pre: Name) {
  return concatName(concatBucket(pre));
}

function generateCfnS3BucketArn<Name extends string>(pre: Name) {
  return concatArn(concatBucket(pre));
}

export { generateCfnS3BucketName, generateCfnS3BucketArn };
