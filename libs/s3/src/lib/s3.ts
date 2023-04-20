import type { S3ClientConfig } from '@aws-sdk/client-s3';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type SignType = 'get' | 'put';

type BucketParams = {
  Bucket: string;
  Key: string;
};

// this class has an internal map of S3ClientConfig to S3Client objects
// creating a single S3Client per config
class S3ClientManager {
  private readonly _s3Clients: Map<S3ClientConfig, S3Client> = new Map();
  static readonly s3DefaultConfig: S3ClientConfig = {};

  getOrCreateS3Client(
    config: S3ClientConfig = S3ClientManager.s3DefaultConfig
  ): S3Client {
    const res = this._s3Clients.get(config);
    if (res) {
      return res;
    }

    const s3Client = new S3Client(config);
    this._s3Clients.set(config, s3Client);
    return s3Client;
  }
}

function createS3Client(config: S3ClientConfig = {}) {
  return new S3Client(config);
}

type SignUrlOptions = {
  expiresIn?: number;
  type: SignType;
  bucketParams: BucketParams;
  s3Client: S3Client;
};

function signUrl({
  bucketParams,
  type,
  expiresIn = 604800,
  s3Client,
}: SignUrlOptions) {
  const command =
    type === 'get'
      ? new GetObjectCommand(bucketParams)
      : new PutObjectCommand(bucketParams);
  return getSignedUrl(s3Client, command, {
    expiresIn,
  });
}

function signUrlGet({
  bucketParams,
  expiresIn = 604800,
  s3Client,
}: Omit<SignUrlOptions, 'type'>) {
  return signUrl({ bucketParams, type: 'get', expiresIn, s3Client });
}

function signUrlPut({
  bucketParams,
  expiresIn = 604800,
  s3Client,
}: Omit<SignUrlOptions, 'type'>) {
  return signUrl({ bucketParams, type: 'put', expiresIn, s3Client });
}

function makeBucketParams(bucket: string, key: string): BucketParams {
  return { Bucket: bucket, Key: key };
}

export {
  signUrl,
  createS3Client,
  signUrlPut,
  signUrlGet,
  makeBucketParams,
  S3ClientManager,
};

export type { SignType, BucketParams, SignUrlOptions };
