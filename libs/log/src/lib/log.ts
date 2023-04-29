import { envEquals } from '@almaclaine/env';
import pino from 'pino';

const devDefaultOptions = {
  transport: {
    target: 'pino-pretty',
  },
};

function createLogger(
  isProduction: boolean,
  options?: pino.LoggerOptions
): pino.Logger {
  const transPort = isProduction ? {} : devDefaultOptions;

  const logger = pino({
    ...transPort,
    ...options,
  });

  logger.level = 'trace';

  return logger;
}

const logger = createLogger(envEquals('LOG_IS_PRODUCTION', 'true'));

export { logger, createLogger };
