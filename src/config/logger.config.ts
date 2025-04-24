import { RequestHandler } from 'express';
import { ServerResponse } from 'http';
import pino, { LevelWithSilent } from 'pino';

enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
  Silent = 'silent',
}

const customLogLevel = (res: ServerResponse, err?: Error): LevelWithSilent => {
  if (err || res.statusCode >= 500) return LogLevel.Error;
  if (res.statusCode >= 400) return LogLevel.Warn;
  if (res.statusCode >= 300) return LogLevel.Silent;
  return LogLevel.Info;
};

const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  base: null,
});
// const logger = pino({
//   level: 'info',
//   formatters: {
//     // Permite personalizar el contenido de cada log
//     log(object) {
//       const clone = { ...object };
//       if (clone.password) clone.password = '[REDACTED]';
//       return clone;
//     },
//   },
//   transport: {
//     target: 'pino-pretty', // solo para desarrollo
//     options: {
//       singleLine: true, // <-- una sola línea por log
//       colorize: true,
//       ignore: 'pid,hostname',
//     },
//   },
// });

const loggerConfig: RequestHandler = (req, res, next) => {
  const startTime = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2); // duration in ms

    const level = customLogLevel(res);
    if (level === LogLevel.Silent) return;

    logger[level](`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms) `);
  });

  next();
};

export default loggerConfig;
