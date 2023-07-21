const multer = require("multer");

const storage = multer.diskStorage({
	destination: "./fileUpload/",
	filename: function (req, file, cb) {
		const filename = new Date().getTime() + "-" + file.originalname;
		cb(null, filename);
	},
});

module.exports = storage;
