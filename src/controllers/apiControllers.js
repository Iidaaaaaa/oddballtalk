const { app } = require("../config/firebase-config");
const {
	getFirestore,
	doc,
	collection,
	addDoc,
	getDocs,
	query,
	where,
	orderBy,
	getDoc,
} = require("@firebase/firestore");

const db = getFirestore(app);

const createHobby = async (url, title, description, tags, userId) => {
	const tagObject = tags.reduce((obj, tag, index) => {
		obj[`tag${index + 1}`] = tag;
		return obj;
	}, {});

	const hobbyData = {
		img: url,
		title: title,
		description: description,
		tags: tagObject,
		userId: doc(db, "users", userId),
		createdAt: new Date(),
	};

	await addDoc(collection(db, "hobbies"), hobbyData);
};
const getHobbiesByUserId = async (userId) => {
	const userRef = doc(db, "users", userId);
	const q = query(collection(db, "hobbies"), where("userId", "==", userRef));
	const querySnapshot = await getDocs(q);
	const hobbies = querySnapshot.docs.map((doc) => doc.data());
	return hobbies;
};

const getAllHobbies = async () => {
	try {
		const q = query(collection(db, "hobbies"), orderBy("createdAt", "desc"));
		const querySnapshot = await getDocs(q);
		const hobbies = await Promise.all(
			querySnapshot.docs.map(async (doc) => {
				const hobby = doc.data();
				const userSnapshot = await getDoc(hobby.userId);
				const user = userSnapshot.data();
				return {
					...hobby,
					userName: user.name,
					userAvatar: user.avatar,
				};
			})
		);
		return hobbies;
	} catch (error) {
		console.error("Error getting hobbies: ", error);
		throw new Error("Error getting hobbies");
	}
};
module.exports = {
	createHobby,
	getHobbiesByUserId,
	getAllHobbies,
};
