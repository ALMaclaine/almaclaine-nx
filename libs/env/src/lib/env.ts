import type { Option } from '@almaclaine/option';
import { none, some } from '@almaclaine/option';

const getEnv = (envVar: string): Option<string> => {
  // if no process.env return none, could be in browser
  if (!process?.env) {
    return none();
  }

  const val = process.env[envVar];
  // if val is falsy return none
  if (!val) {
    return none();
  }
  return some(val);
};

const setEnv = (envVar: string, value?: string): void => {
  // if no process.env return none, could be in browser
  if (!process?.env) {
    return;
  }
  process.env[envVar] = value;
};

export { getEnv, setEnv };
