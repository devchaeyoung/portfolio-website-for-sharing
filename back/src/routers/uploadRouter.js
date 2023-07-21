const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.use("/fileUpload", express.static(__dirname + "/fileUpload"));

router.post(
	"/uploadImage",
	uploadMiddleware.handleImageUpload,
	(req, res, next) => {
		if (req.file) {
			console.log("---유저 이미지 업로드---");
			console.log("Uploaded Image:", req.file);
			res.json({ url: req.file.path });
		} else {
			res.status(400).json({
				error: "No file uploaded or an error occurred during upload.",
			});
		}
	},
);

module.exports = router;
