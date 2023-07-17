const winston = require("winston");
const moment = require("moment");
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

// const getCurrentDate = () => {
// 	return moment().format("YYYY-MM-DD");
// };

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
		tailable: true,
		zippedArchive: true,
		format,
	});
};

const transports = [
	new winston.transports.Console(),
	createTransport("info", `logs/all.log`),
	createTransport(
		"error",
		`logs/error/${moment().format("YYYY-MM-DD")}-error.log`,
	),
	createTransport(
		"warn",
		`logs/warn/${moment().format("YYYY-MM-DD")}-warn.log`,
	),
	createTransport(
		"info",
		`logs/info/${moment().format("YYYY-MM-DD")}-info.log`,
	),
	createTransport(
		"http",
		`logs/http/${moment().format("YYYY-MM-DD")}-http.log`,
	),
	createTransport(
		"debug",
		`logs/debug/${moment().format("YYYY-MM-DD")}-debug.log`,
	),
];

const logger = winston.createLogger({
	level: level(),
	levels,
	transports,
});

module.exports = logger;
