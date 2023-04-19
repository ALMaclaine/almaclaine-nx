import { exec } from './exec';
import type { ExecFunction, ExecRecord } from '@almaclaine/types';

const forIn = <T>(obj: ExecRecord, fn: ExecFunction, self?: T): void => {
  for (const key in obj) {
    if (exec(fn, obj, key, self) === false) {
      break;
    }
  }
};
export { forIn };
