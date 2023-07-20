const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
	write: (message) =>
		logger.http(
			message.replace(
				/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
				"",
			),
		),
};

const skip = () => {
	const env = process.env.NODE_ENV || "development";
	return env !== "development";
};

const morganMiddleware = morgan(
	":remote-addr :method :url :status :res[content-length] - :response-time ms",
	{
		stream,
		skip,
	},
);

module.exports = morganMiddleware;
