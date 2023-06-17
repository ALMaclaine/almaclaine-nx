import type { JoinedString } from '../../types';
import { concatLiteral } from '../utils';

function concatName<T extends string>(pre: T): JoinedString<T, 'Name'> {
  return concatLiteral(pre, 'Name');
}

function concatArn<T extends string>(pre: T): JoinedString<T, 'Arn'> {
  return concatLiteral(pre, 'Arn');
}

function concatBucket<T extends string>(pre: T): JoinedString<T, 'Bucket'> {
  return concatLiteral(pre, 'Bucket');
}

function concatUrl<T extends string>(pre: T): JoinedString<T, 'Url'> {
  return concatLiteral(pre, 'Url');
}

function concatTable<T extends string>(pre: T): JoinedString<T, 'Table'> {
  return concatLiteral(pre, 'Table');
}

function concatQueue<T extends string>(pre: T): JoinedString<T, 'Queue'> {
  return concatLiteral(pre, 'Queue');
}

function concatUser<T extends string>(pre: T): JoinedString<T, 'User'> {
  return concatLiteral(pre, 'User');
}

function concatDeadQueue<T extends string>(
  pre: T
): JoinedString<JoinedString<T, 'Dead'>, 'Queue'> {
  return concatLiteral(pre, concatQueue('Dead'));
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
