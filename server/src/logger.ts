import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

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
  labelFormat({ label: 'Project Name' }),
  timestampFormat(),
  fileFormat,
);

const logDir = path.join(process.cwd(), '/logs');

const commonTransportOptions = {
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
};

const infoTransport = new DailyRotateFile({
  level: 'info',
  filename: `%DATE%.log`,
  dirname: logDir,
  ...commonTransportOptions,
});
const errorTransport = new DailyRotateFile({
  level: 'error',
  filename: `%DATE%-error.log`,
  dirname: `${logDir}/error`,
  ...commonTransportOptions,
});

const logger = createLogger({
  format: loggerFormat,
  transports: [infoTransport, errorTransport],
});

if (process.env.NODE_ENV !== 'production')
  logger.add(new transports.Console({ format: combine(colorize(), simple()) }));

export default logger;
