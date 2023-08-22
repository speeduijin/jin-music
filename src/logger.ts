import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.join(process.cwd(), '/logs');

const {
  combine,
  printf,
  label: labelFormat,
  timestamp: timestampFormat,
  colorize,
  simple,
} = format;

const fileFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`,
);

const loggerFormat = combine(
  labelFormat({ label: 'jin-music-api' }),
  timestampFormat(),
  fileFormat,
);

const commonTransportOptions = {
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
};

const errorTransport = new DailyRotateFile({
  level: 'error',
  filename: `%DATE%-error.log`,
  dirname: `${logDir}/error`,
  ...commonTransportOptions,
});
const infoTransport = new DailyRotateFile({
  level: 'info',
  filename: `%DATE%.log`,
  dirname: logDir,
  ...commonTransportOptions,
});
const httpTransport = new DailyRotateFile({
  level: 'http',
  filename: `%DATE%-http.log`,
  dirname: `${logDir}/http`,
  ...commonTransportOptions,
});

const logger = createLogger({
  format: loggerFormat,
  transports: [errorTransport, infoTransport, httpTransport],
});

if (process.env.NODE_ENV !== 'production')
  logger.add(new transports.Console({ format: combine(colorize(), simple()) }));

export default logger;
