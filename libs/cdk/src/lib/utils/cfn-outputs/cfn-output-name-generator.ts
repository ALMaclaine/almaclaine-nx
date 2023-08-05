import { Concat, ConcatEnum } from './cfn-outputs-utils';
import { pipe } from '@effect/data/Function';

class CfnOutputNameGenerator {
  static queueName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.QUEUE),
      Concat.concatC(ConcatEnum.NAME)
    );
  }

  static queueUrl<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.QUEUE),
      Concat.concatC(ConcatEnum.URL)
    );
  }

  static queueArn<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.QUEUE),
      Concat.concatC(ConcatEnum.ARN)
    );
  }

  static deadQueueName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.DEAD_QUEUE),
      Concat.concatC(ConcatEnum.NAME)
    );
  }

  static deadQueueArn<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.DEAD_QUEUE),
      Concat.concatC(ConcatEnum.ARN)
    );
  }

  static deadQueueUrl<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.DEAD_QUEUE),
      Concat.concatC(ConcatEnum.URL)
    );
  }

  static s3BucketName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.BUCKET),
      Concat.concatC(ConcatEnum.NAME)
    );
  }

  static s3BucketArn<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.BUCKET),
      Concat.concatC(ConcatEnum.ARN)
    );
  }

  static tableName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.TABLE),
      Concat.concatC(ConcatEnum.NAME)
    );
  }

  static tableArn<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.TABLE),
      Concat.concatC(ConcatEnum.ARN)
    );
  }

  static userName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.USER),
      Concat.concatC(ConcatEnum.NAME)
    );
  }

  static userArn<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.USER),
      Concat.concatC(ConcatEnum.ARN)
    );
  }

  static userAccessKeyId<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.USER),
      Concat.concatC(ConcatEnum.ACCESS_KEY_ID)
    );
  }

  static userSecretAccessKeyId<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.USER),
      Concat.concatC(ConcatEnum.SECRET_ACCESS_KEY_ID)
    );
  }

  static vercelServerUserName<Name extends string>(pre: Name) {
    return pipe(pre, Concat.concatC(ConcatEnum.VERCEL_SERVER), (pre) =>
      CfnOutputNameGenerator.userName(pre)
    );
  }

  static vercelServerUserArn<Name extends string>(pre: Name) {
    return pipe(pre, Concat.concatC(ConcatEnum.VERCEL_SERVER), (pre) =>
      CfnOutputNameGenerator.userArn(pre)
    );
  }

  static vercelServerUserAccessKeyId<Name extends string>(pre: Name) {
    return pipe(pre, Concat.concatC(ConcatEnum.VERCEL_SERVER), (pre) =>
      CfnOutputNameGenerator.userAccessKeyId(pre)
    );
  }

  static vercelServerUserSecretAccessKeyId<Name extends string>(pre: Name) {
    return pipe(pre, Concat.concatC(ConcatEnum.VERCEL_SERVER), (pre) =>
      CfnOutputNameGenerator.userSecretAccessKeyId(pre)
    );
  }

  static userPoolName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.USER_POOL),
      Concat.concatC(ConcatEnum.NAME)
    );
  }

  static userPoolClientName<Name extends string>(pre: Name) {
    return pipe(
      pre,
      Concat.concatC(ConcatEnum.USER_POOL_CLIENT),
      Concat.concatC(ConcatEnum.NAME)
    );
  }
}

export { CfnOutputNameGenerator };
