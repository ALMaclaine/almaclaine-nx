import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const CollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
  isPublic: z.boolean(),
  ownerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Collection = z.infer<typeof CollectionSchema>;

const CollectionExtendedSchema = CollectionSchema.extend({
  members: z.unknown().array(), // Adjust as per the actual member schema
  _count: z.object({
    links: z.number(),
  }),
});

type CollectionExtended = z.infer<typeof CollectionExtendedSchema>;

const CollectionResponseSchema = z.object({
  response: CollectionExtendedSchema,
});

type CollectionResponse = z.infer<typeof CollectionResponseSchema>;

const CollectionArrayResponseSchema = z.object({
  response: CollectionExtendedSchema.array(),
});

type CollectionArrayResponse = z.infer<typeof CollectionArrayResponseSchema>;

const PostCollectionPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  isPublic: z.boolean(),
  members: z.unknown().array(), // Adjust as per the actual member schema
});

type PostCollectionPayload = z.infer<typeof PostCollectionPayloadSchema>;

const collectionsContract = c.router({
  getCollections: {
    method: 'GET',
    path: '/api/v1/collections',
    responses: {
      200: CollectionArrayResponseSchema,
    },
    summary: 'Get collections for a specific user',
  },
  postCollection: {
    method: 'POST',
    path: '/api/v1/collections',
    responses: {
      200: CollectionResponseSchema,
    },
    body: PostCollectionPayloadSchema,
    summary: 'Create a new collection',
  },
  updateCollection: {
    method: 'PUT',
    path: '/api/v1/collections/:id',
    responses: {
      200: CollectionResponseSchema,
    },
    body: CollectionExtendedSchema, // Assuming same structure as CollectionExtendedSchema
    summary: 'Update a specific collection',
  },
  deleteCollection: {
    method: 'DELETE',
    path: '/api/v1/collections/:id',
    responses: {
      200: CollectionResponseSchema,
    },
    summary: 'Delete a specific collection',
    body: z.object({}),
  },
});

export {
  collectionsContract,
  CollectionSchema,
  CollectionExtendedSchema,
  CollectionArrayResponseSchema,
  CollectionResponseSchema,
  PostCollectionPayloadSchema,
};

export type {
  Collection,
  CollectionExtended,
  CollectionResponse,
  CollectionArrayResponse,
  PostCollectionPayload,
};
