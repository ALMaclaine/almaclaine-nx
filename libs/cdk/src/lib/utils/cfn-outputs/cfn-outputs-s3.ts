import { generateArn, generateName, prefix } from './cfn-outputs-utils';

function generateCfnS3BucketName(pre: string) {
  return generateName(prefix(pre, 'Bucket'));
}

function generateCfnS3BucketArn(pre: string) {
  return generateArn(prefix(pre, 'Bucket'));
}

export { generateCfnS3BucketName, generateCfnS3BucketArn };
