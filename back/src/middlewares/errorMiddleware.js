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
		maxSize: "10m",
		maxFiles: "30d",
		zippedArchive: true,
		tailable: false,
		format,
	});

const transports = [
	new winston.transports.File({
		filename: "logs/all.log",
		level: "debug",
		maxsize: 10485760,
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

function errorMiddleware(error, req, res, next) {
	// 터미널에 노란색으로 출력됨.
	console.log("\x1b[33m%s\x1b[0m", error);

	logger.error(`${error.stack}`);
	res.status(400).send(error.message);
}

export { errorMiddleware };
