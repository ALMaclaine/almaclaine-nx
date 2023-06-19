import type { z } from 'zod';
import type { LiteralEnum } from '@almaclaine/types';
import { cast } from '@almaclaine/types';

/**
 * Casts a ZodEnum schema to a Record of the same type.
 * @template T - The type of the enum values (string, number, or symbol).
 * @param {z.ZodEnum<[string, ...string[]]>} schema - The ZodEnum schema to cast.
 * @returns {Record<T, T>} - A Record object with keys and values of the same type as the enum values.
 */
function castEnum<T extends string | number | symbol>(
  schema: z.ZodEnum<[string, ...string[]]>
): LiteralEnum<T> {
  return cast<LiteralEnum<T>>(schema.enum);
}

export { castEnum };
