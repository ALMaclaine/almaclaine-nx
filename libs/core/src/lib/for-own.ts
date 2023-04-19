import { forIn } from './for-in';
import { exec } from './exec';
import { hasOwn } from './has-own';
import type { ExecFunction, ExecRecord } from '@almaclaine/types';

const forOwn = <T>(obj: ExecRecord, fn: ExecFunction, self?: T): void => {
  forIn<T>(
    obj,
    function (_val: unknown, key: string, objPassed: ExecRecord) {
      if (hasOwn(obj, key)) {
        return exec(fn, objPassed, key, self);
      }
    },
    self
  );
};
export { forOwn };
