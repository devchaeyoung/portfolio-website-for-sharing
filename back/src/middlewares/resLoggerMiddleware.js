// responseLoggerMiddleware.js
const winston = require("winston");
const moment = require("moment/moment");

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const level = () => {
	const env = process.env.NODE_ENV || "development";
	const isDevelopment = env === "development";
	return isDevelopment ? "debug" : "warn";
};
const format = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`,
	),
);
const createTransport = (level, filename) => {
	return new winston.transports.File({
		filename,
		level,
		maxsize: 10485760, // 10MB
		maxFiles: 30,
		zippedArchive: true,
		tailable: false,
		format,
	});
};

const transports = [
	new winston.transports.Console(),
	createTransport("debug", `logs/all.log`),
	createTransport(
		"error",
		`logs/levels/error/${moment().format("YYYY-MM-DD")}-error.log`,
	),
	createTransport(
		"warn",
		`logs/levels/warn/${moment().format("YYYY-MM-DD")}-warn.log`,
	),
	createTransport(
		"info",
		`logs/levels/info/${moment().format("YYYY-MM-DD")}-info.log`,
	),
	createTransport(
		"http",
		`logs/levels/http/${moment().format("YYYY-MM-DD")}-http.log`,
	),
	createTransport(
		"debug",
		`logs/levels/debug/${moment().format("YYYY-MM-DD")}-debug.log`,
	),
];

// Create a logger with Winston
const logger = winston.createLogger({
	level: level(),
	levels,
	transports,
});

function resLoggerMiddleware(req, res, next) {
	const originalSend = res.send;

	res.send = function (body) {
		if (res.statusCode < 400) {
			const logMessage = `${req.method} ${req.url} - Status ${res.statusCode}`;
			logger.info(logMessage);
		}
		originalSend.call(this, body);
	};
	next();
}

module.exports = resLoggerMiddleware;
