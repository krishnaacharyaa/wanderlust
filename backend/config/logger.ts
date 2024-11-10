import { createLogger, transports, format } from 'winston';

const options = {
  file: {
    level: 'error',
    filename: `./logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const alignColorsAndTime = format.combine(
  format.colorize({
    all: true,
  }),
  format.label({
    label: 'Backend',
  }),
  format.timestamp({
    format: 'DD-MMM-YYYY HH:mm:ss',
  }),
  format.printf((info) => `[${info.timestamp} - ${info.label}] ${info.level}: ${info.message}`)
);

export default createLogger({
  format: alignColorsAndTime,
  transports: [new transports.File(options.file), new transports.Console(options.console)],
});
