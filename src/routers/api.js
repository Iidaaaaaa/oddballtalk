const express = require("express");
const router = express.Router();
const { firebaseConfig } = require("../config/firebase-config");
const {
	createHobby,
	getHobbiesByUserId,
	getAllHobbies,
} = require("../controllers/apiControllers");

router.get("/firebase-config", (req, res) => {
	res.json(firebaseConfig);
});

router.post("/hobby", async (req, res) => {
	const { url, title, description, tags, userId } = req.body;
	try {
		await createHobby(url, title, description, tags, userId);
		res.status(201).json({ message: "Hobby created successfully" });
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	}
});

router.post("/my-hobbies", async (req, res) => {
	const { userId } = req.body;
	try {
		const hobbies = await getHobbiesByUserId(userId);
		res.status(200).json(hobbies);
	} catch (error) {
		console.log(userId);
		res.status(500).json({ error: error.toString() });
	}
});

router.get("/hobbies", async (req, res) => {
	try {
		const hobbies = await getAllHobbies();
		res.status(200).json(hobbies);
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	}
});

module.exports = router;
