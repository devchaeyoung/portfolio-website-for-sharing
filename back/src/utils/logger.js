const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

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
	winston.format.printf((info) => {
		if (typeof info.message === "object") {
			return `${info.timestamp} ${info.level}: ${JSON.stringify(
				info.message,
			)}`;
		}
		return `${info.timestamp} ${info.level}: ${info.message}`;
	}),
);

const createTransport = (level, filename) =>
	new DailyRotateFile({
		filename,
		level,
		datePattern: "YYYY-MM-DD",
		maxSize: "10m", // 10MB (same as 10m for megabytes)
		maxFiles: "30d", // 30 days
		zippedArchive: true,
		tailable: false,
		format,
	});

const transports = [
	new winston.transports.File({
		filename: "logs/all.log",
		level: "debug",
		maxsize: 10485760, // 10MB
		maxFiles: 30,
		zippedArchive: true,
		tailable: false,
		format,
	}),
	createTransport("error", `logs/levels/error/error`),
	createTransport("warn", `logs/levels/warn/warn`),
	createTransport("info", `logs/levels/info/info`),
	createTransport("http", `logs/levels/http/http`),
	createTransport("debug", `logs/levels/debug/debug`),
];

const logger = winston.createLogger({
	level: level(),
	levels,
	transports,
});

module.exports = logger;
