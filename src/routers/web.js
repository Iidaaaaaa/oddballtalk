const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index.ejs");
});

router.get("/signup", (req, res) => {
	res.render("signup.ejs");
});

router.get("/home", (req, res) => {
	res.render("home.ejs");
});

router.get("/profile", (req, res) => {
	res.render("profile.ejs");
});

router.get("/create-profile", (req, res) => {
	res.render("create-profile.ejs");
});

router.get("/notification", (req, res) => {
	res.render("notification.ejs");
});

router.get("/chat", (req, res) => {
	res.render("chat.ejs");
});

router.get("/chat-new", (req, res) => {
	res.render("chat-new.ejs");
});
router.get("/upload-test", (req, res) => {
	res.render("upload-test");
});

module.exports = router;
