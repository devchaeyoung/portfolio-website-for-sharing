class FileAppender {
	constructor(strategy, req) {
		this.strategy = strategy;
		this.req = req;

		switch (strategy) {
			case "NONE":
				break;
			case "VALUE":
				break;
			case "ARRAY":
				req.files = [];
				break;
			case "OBJECT":
				req.files = Object.create(null);
				break;
			default:
				throw new Error("Unknown file strategy : " + strategy);
		}
	}

	replacePlaceholder(placeholder, file) {
		if (this.strategy === "VALUE") {
			this.req.file = file;
			return;
		}

		delete placeholder.fieldname;
		Object.assign(placeholder, file);
	}
}

module.exports = FileAppender;
