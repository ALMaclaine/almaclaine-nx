import type { Option } from '@almaclaine/option';
import { equalsValue, option } from '@almaclaine/option';

function getEnv(envVar: string): Option<string> {
  return option<string>(process.env[envVar]);
}

function envEquals(envVar: string, val: string): boolean {
  return equalsValue(getEnv(envVar), val);
}

function setEnv(envVar: string, value?: string): void {
  process.env[envVar] = value;
}

export { getEnv, setEnv, envEquals };
