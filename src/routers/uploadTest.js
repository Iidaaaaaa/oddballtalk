const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const router = express.Router();

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // limit file size to 5MB
	},
});

const storage = new Storage({
	projectId: "spic-15a85",
	keyFilename: "./keyfile.json",
});

const bucket = storage.bucket("spic-15a85.appspot.com");

router.post("/upload", upload.single("image"), (req, res) => {
	if (!req.file) {
		res.status(400).send("No file uploaded.");
		return;
	}
	const blob = bucket.file(req.file.originalname);
	const blobStream = blob.createWriteStream();

	blobStream.on("error", (err) => {
		console.error(err);
		res.status(500).send(err.message);
	});

	blobStream.on("finish", () => {
		const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
		console.log(publicUrl);
		res.status(200).send(publicUrl);
	});
	blobStream.end(req.file.buffer);
});

module.exports = router;
