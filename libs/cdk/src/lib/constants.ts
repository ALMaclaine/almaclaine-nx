import type { ObjectValues } from '@almaclaine/types';

const DYNAMO_PRIMARY_KEY_NAME = 'PK';
const DYNAMO_SORT_KEY_NAME = 'SK';

const TAG_STAGE = 'stage';

const STAGES = {
  DEV: 'deve',
  TEST: 'test',
  PROD: 'prod',
} as const;

type Stages = ObjectValues<typeof STAGES>;

export { DYNAMO_PRIMARY_KEY_NAME, DYNAMO_SORT_KEY_NAME, STAGES, TAG_STAGE };
export type { Stages };
