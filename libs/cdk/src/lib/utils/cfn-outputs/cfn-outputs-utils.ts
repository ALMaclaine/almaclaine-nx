import type { JoinedString } from '../../types';
import { concatLiteral } from '../utils';
import type { Stages } from '../../constants';

function concatName<Name extends string>(
  pre: Name
): JoinedString<Name, 'Name'> {
  return concatLiteral(pre, 'Name');
}

function concatArn<Name extends string>(pre: Name): JoinedString<Name, 'Arn'> {
  return concatLiteral(pre, 'Arn');
}

function concatAccessKeyId<Name extends string>(
  pre: Name
): JoinedString<Name, 'AccessKeyId'> {
  return concatLiteral(pre, 'AccessKeyId');
}

function concatSecretAccessKeyId<Name extends string>(
  pre: Name
): JoinedString<Name, 'SecretAccessKeyId'> {
  return concatLiteral(pre, 'SecretAccessKeyId');
}

function concatBucket<Name extends string>(
  pre: Name
): JoinedString<Name, 'Bucket'> {
  return concatLiteral(pre, 'Bucket');
}

function concatUrl<Name extends string>(pre: Name): JoinedString<Name, 'Url'> {
  return concatLiteral(pre, 'Url');
}

function concatTable<Name extends string>(
  pre: Name
): JoinedString<Name, 'Table'> {
  return concatLiteral(pre, 'Table');
}

function concatQueue<Name extends string>(
  pre: Name
): JoinedString<Name, 'Queue'> {
  return concatLiteral(pre, 'Queue');
}

function concatUser<Name extends string>(
  pre: Name
): JoinedString<Name, 'User'> {
  return concatLiteral(pre, 'User');
}

function concatDeadQueue<Name extends string>(
  pre: Name
): JoinedString<JoinedString<Name, 'Dead'>, 'Queue'> {
  return concatLiteral(pre, concatQueue('Dead'));
}

function concatStage<Name extends string>(
  pre: Name,
  stage: Stages
): JoinedString<Name, Uppercase<Stages>> {
  return concatLiteral(pre, stage.toUpperCase() as Uppercase<Stages>);
}

export {
  concatAccessKeyId,
  concatArn,
  concatBucket,
  concatDeadQueue,
  concatName,
  concatQueue,
  concatSecretAccessKeyId,
  concatStage,
  concatTable,
  concatUrl,
  concatUser,
};
