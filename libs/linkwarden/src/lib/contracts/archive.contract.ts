import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const archiveContract = c.router({
  getArchivedFile: {
    method: 'GET',
    path: '/api/v1/archives/:id',
    responses: {
      200: z.instanceof(Blob), // Indicate that the response is a Blob
    },
    query: z.object({
      format: z.union([z.literal('0'), z.literal('1')]).optional(),
    }),
    summary:
      'Get the archived file for a specific link in the specified format',
  },
});

export { archiveContract };
