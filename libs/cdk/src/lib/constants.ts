import type { ObjectValues } from '@almaclaine/types';
import { z } from 'zod';
import { castEnum } from '@almaclaine/zod';

const DYNAMO_PRIMARY_KEY_NAME = 'PK';
const DYNAMO_SORT_KEY_NAME = 'SK';

const TAG_STAGE = 'stage';

const StageValues = ['DEVE', 'TEST', 'PROD'] as const;
const StageSchema = z.enum(StageValues);
type Stages = z.infer<typeof StageSchema>;

const StagesEnum = castEnum<Stages>(StageSchema);

function isStage(value: unknown): value is Stages {
  return StageSchema.safeParse(value).success;
}

function isProd(stage: Stages) {
  return stage === StagesEnum.PROD;
}

function isTest(stage: Stages) {
  return stage === StagesEnum.TEST;
}

function isDeve(stage: Stages) {
  return stage === StagesEnum.DEVE;
}

export {
  DYNAMO_PRIMARY_KEY_NAME,
  DYNAMO_SORT_KEY_NAME,
  TAG_STAGE,
  StagesEnum,
  StageValues,
  StageSchema,
  isDeve,
  isProd,
  isTest,
  isStage,
};
export type { Stages };
