import { Logger } from 'tslog';

// const logger = new Logger({
//   name: 'myLogger',
//   minLevel: 3,
//   hideLogPositionForProduction: process.env.NODE_ENV === 'production',
// });
// logger.silly('I am a silly log.');
// logger.trace('I am a trace log.');
// logger.debug('I am a debug log.');
// logger.info('I am an info log.');
// logger.warn('I am a warn log with a json object:', { foo: 'bar' });
// logger.error('I am an error log.');
// logger.fatal(new Error('I am a pretty Error with a stacktrace.'));
//
// const mainLogger = new Logger({ type: 'pretty', name: 'MainLogger' });
// mainLogger.silly('foo bar');
//
// const firstSubLogger = mainLogger.getSubLogger({ name: 'FirstSubLogger' });
// firstSubLogger.silly('foo bar 1');
//
// const secSubLogger = firstSubLogger.getSubLogger({
//   name: 'SecondSubLogger',
//   minLevel: 1,
// });
// secSubLogger.silly('foo bar 1');

const logger1 = new Logger({
  name: 'myLogger',
  minLevel: 3,
  hideLogPositionForProduction: process.env.NODE_ENV === 'production',
});
logger1.silly('I am a silly log.');

const logger2 = new Logger({
  name: 'myLogger',
  minLevel: 0,
  hideLogPositionForProduction: process.env.NODE_ENV === 'production',
});
logger2.silly('I am a silly log.');
