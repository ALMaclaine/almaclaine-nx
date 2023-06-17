import type { JoinedString } from '../../types';

function concat<T extends string, K extends string>(
  valT: T,
  valK: K
): JoinedString<T, K> {
  return `${valT}${valK}`;
}

function concatName<T extends string>(pre: T): JoinedString<T, 'Name'> {
  return concat(pre, 'Name');
}

function concatArn<T extends string>(pre: T): JoinedString<T, 'Arn'> {
  return concat(pre, 'Arn');
}

function concatBucket<T extends string>(pre: T): JoinedString<T, 'Bucket'> {
  return concat(pre, 'Bucket');
}

function concatUrl<T extends string>(pre: T): JoinedString<T, 'Url'> {
  return concat(pre, 'Url');
}

function concatTable<T extends string>(pre: T): JoinedString<T, 'Table'> {
  return concat(pre, 'Table');
}

function concatQueue<T extends string>(pre: T): JoinedString<T, 'Queue'> {
  return concat(pre, 'Queue');
}

function concatUser<T extends string>(pre: T): JoinedString<T, 'User'> {
  return concat(pre, 'User');
}

function concatDeadQueue<T extends string>(
  pre: T
): JoinedString<JoinedString<T, 'Dead'>, 'Queue'> {
  return concat(pre, concatQueue('Dead'));
}

export {
  concat,
  concatArn,
  concatName,
  concatBucket,
  concatUrl,
  concatUser,
  concatTable,
  concatQueue,
  concatDeadQueue,
};
