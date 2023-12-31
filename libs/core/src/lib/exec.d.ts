import type { ExecFunction, ExecRecord, ExecReturn } from '@almaclaine/types';
declare const exec: <T>(fn: ExecFunction, obj: ExecRecord, key: string, self?: T | undefined) => ExecReturn;
export { exec };
