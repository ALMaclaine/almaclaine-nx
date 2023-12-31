import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { TagSchema } from './tag.contract';
import { CollectionSchema } from './collection.contract';

const c = initContract();

// Collection Schema (previously defined)

// New Link Schema
const LinkSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  description: z.string(),
  collectionId: z.number(),
  textContent: z.string(),
  screenshotPath: z.string(),
  pdfPath: z.string(),
  readabilityPath: z.string(),
  lastPreserved: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: TagSchema.array(), // Nested Tags
  collection: CollectionSchema, // Nested Collection
  pinnedBy: z.unknown().array(), // Adjust as per the actual schema
});

type Link = z.infer<typeof LinkSchema>;

// Response Schema
const LinkResponseSchema = z.object({
  response: LinkSchema.array(),
});

type LinkResponse = z.infer<typeof LinkResponseSchema>;

const PostLinkPayloadSchema = z.object({
  description: z.string(),
  name: z.string(),
  pdfPath: z.string(),
  readabilityPath: z.string(),
  screenshotPath: z.string(),
  tags: TagSchema.array(),
  textContent: z.string().optional(),
  url: z.string(),
  collection: CollectionSchema.pick({
    id: true,
    name: true,
    ownerId: true,
  }),
});

type PostLinkPayload = z.infer<typeof PostLinkPayloadSchema>;

const PutLinkPayloadSchema = PostLinkPayloadSchema.extend({
  collection: CollectionSchema, // Assuming this is a simplified version for the payload
  collectionId: z.number(),
  createdAt: z.string(),
  id: z.number(),
  lastPreserved: z.string().optional(),
  pinnedBy: z.unknown().array().optional(), // Adjust as per the actual schema
  updatedAt: z.string(),
});

type PutLinkPayload = z.infer<typeof PutLinkPayloadSchema>;

const linkContract = c.router({
  // ... other endpoints
  getLinks: {
    method: 'GET',
    path: '/api/v1/links',
    responses: {
      200: LinkResponseSchema,
    },
    query: z.object({
      sort: z.number().min(0).max(5).optional(),
      collectionId: z.number().positive().optional(),
    }),
    summary: 'Get links with optional sorting and collection filtering',
  },
  postLink: {
    method: 'POST',
    path: '/api/v1/links',
    responses: {
      200: LinkResponseSchema,
    },
    body: PostLinkPayloadSchema,
    summary: 'Create a new link',
  },
  updateLink: {
    method: 'PUT',
    path: '/api/v1/links/:id',
    responses: {
      200: LinkResponseSchema,
    },
    body: PutLinkPayloadSchema,
    summary: 'Update an existing link',
  },
  deleteLink: {
    method: 'DELETE',
    path: '/api/v1/links/:id',
    responses: {
      200: LinkResponseSchema,
    },
    body: z.object({}),
    summary: 'Delete a specific link and return its details',
  },
});

export {
  linkContract,
  LinkSchema,
  PostLinkPayloadSchema,
  LinkResponseSchema,
  PutLinkPayloadSchema,
};
export type { Link, PostLinkPayload, LinkResponse, PutLinkPayload };
