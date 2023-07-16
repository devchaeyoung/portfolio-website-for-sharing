const winston = require('winston');
const morgan = require('morgan');
const path = require('path');

const morganFormat = ':method :url :status :response-time ms - :res[content-length]';


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: path.join(__dirname, 'logs', 'app.log') })
    ]
  });

  
  
  module.exports = { morgan, logger, morganFormat };