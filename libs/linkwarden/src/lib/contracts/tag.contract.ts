import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

// Schema for the tag payload
const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  ownerId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Tag = z.infer<typeof TagSchema>;

// Schema for the PUT response
const UpdateTagResponseSchema = z.object({
  response: TagSchema,
});

type UpdateTagResponse = z.infer<typeof UpdateTagResponseSchema>;

const tagContract = c.router({
  updateTag: {
    method: 'PUT',
    path: '/api/v1/tags/:id',
    responses: {
      200: UpdateTagResponseSchema,
    },
    body: TagSchema,
    summary: 'Update a tag by id',
  },
  deleteTag: {
    method: 'DELETE',
    path: '/api/v1/tags/:id',
    responses: {
      200: UpdateTagResponseSchema,
    },
    summary: 'Delete a tag by id',
    body: z.object({}),
  },
  getTags: {
    method: 'GET',
    path: '/api/v1/tags',
    responses: {
      200: TagSchema.array(),
    },
    summary: 'Get all tags',
  },
});

export { tagContract, TagSchema, UpdateTagResponseSchema };
export type { Tag, UpdateTagResponse };
