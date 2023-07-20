const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { format } = require('winston');
const { combine, timestamp, colorize } = format;

const morganFormat = `:remote-addr :method :url :status :response-time ms - :res[content-length]`;

const logDir = 'log/levels';

const logger = winston.createLogger({
  format : combine(
    timestamp({
      format : 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports : [
    new winstonDaily({
      level: 'info',
      datePattern : 'YYYY-MM-DD',
      dirname: logDir,
      filename : `%DATE%.log`,
      maxFiles: 7,
      zippedArchive : true,
    }),
  // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 7,
      zippedArchive: true,
    }),

  ],
});

logger.stream = {
  write : message => {
    logger.info(message);
  }
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
      format: combine(
          colorize({ all: true }),
          winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
          }),
      )
  }));
}

const logRequest = (req, res, next) => {
  const status = res.statusCode || (res._header ? res.statusCode : null);
  if (status >= 400) {
    logger.error(`Error occurred. Status Code: ${status}`);
    next();
  } else {
    logger.info(`Request Body: ${status} ${JSON.stringify(req.body)}`);
    next();
  }
};
module.exports = { logger, morganFormat, logRequest };