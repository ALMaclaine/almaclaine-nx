import { concatLiteral, upperCaseLiteral } from './utils';
import type { ArrayValues } from '@almaclaine/types';
import { pipe } from '@effect/data/Function';
import type { UnderscoreJoin } from '../types';

const ConfigNameValues = [
  'TABLE_STACK',
  'USER_STACK',
  'TABLE_OUTPUT_NAME',
  'TABLE_ARN',
  'TABLE_NAME',
  'USER_NAME',
  'USER_ARN',
] as const;

type ConfigName = ArrayValues<typeof ConfigNameValues>;

const ConfigNameSet = new Set(ConfigNameValues);

const ConfigNameEnum = {
  TABLE_STACK: 'TABLE_STACK',
  USER_STACK: 'USER_STACK',
  TABLE_OUTPUT_NAME: 'TABLE_OUTPUT_NAME',
  TABLE_ARN: 'TABLE_ARN',
  TABLE_NAME: 'TABLE_NAME',
  USER_NAME: 'USER_NAME',
  USER_ARN: 'USER_ARN',
} as const;

class GenerateConfigName {
  private static validateConfigName(configName: ConfigName) {
    if (!ConfigNameSet.has(configName)) {
      throw new Error(`Config name ${configName} is not a valid config name`);
    }
  }

  static generate<Name extends string, Config extends ConfigName>(
    stackName: Name,
    configName: Config
  ): UnderscoreJoin<`${Uppercase<Name>}`, `${Config}`> {
    this.validateConfigName(configName);
    return pipe(
      stackName,
      upperCaseLiteral,
      (val) => concatLiteral(val, '_'),
      (val) => concatLiteral(val, configName)
    );
  }
}

export { GenerateConfigName };

export type { ConfigName };
