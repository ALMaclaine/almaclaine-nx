import { concat } from '@almaclaine/string';

function concatName(pre: string) {
  return concat(pre, 'Name');
}

function concatArn(pre: string) {
  return concat(pre, 'Arn');
}

function concatBucket(pre: string) {
  return concat(pre, 'Bucket');
}

function concatUrl(pre: string) {
  return concat(pre, 'Url');
}

function concatTable(pre: string) {
  return concat(pre, 'Table');
}

function concatQueue(pre: string) {
  return concat(pre, 'Queue');
}

function concatUser(pre: string) {
  return concat(pre, 'User');
}

function concatDeadQueue(pre: string) {
  return concat(pre, concatQueue('Dead'));
}

export {
  concatArn,
  concatName,
  concatBucket,
  concatUrl,
  concatUser,
  concatTable,
  concatQueue,
  concatDeadQueue,
};
