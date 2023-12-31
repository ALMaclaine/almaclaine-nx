export { archiveContract } from './lib/contracts/archive.contract';

export {
  collectionsContract,
  CollectionSchema,
  CollectionExtendedSchema,
  CollectionArrayResponseSchema,
  CollectionResponseSchema,
  PostCollectionPayloadSchema,
} from './lib/contracts/collection.contract';
export type {
  Collection,
  CollectionExtended,
  CollectionResponse,
  CollectionArrayResponse,
  PostCollectionPayload,
} from './lib/contracts/collection.contract';

export {
  linkContract,
  LinkSchema,
  PostLinkPayloadSchema,
  LinkResponseSchema,
  PutLinkPayloadSchema,
} from './lib/contracts/link.contract';
export type {
  Link,
  PostLinkPayload,
  LinkResponse,
  PutLinkPayload,
} from './lib/contracts/link.contract';

export {
  tagContract,
  TagSchema,
  UpdateTagResponseSchema,
} from './lib/contracts/tag.contract';
export type { Tag, UpdateTagResponse } from './lib/contracts/tag.contract';
