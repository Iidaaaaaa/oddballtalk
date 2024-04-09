window.onload = function () {
	const idToken = sessionStorage.getItem("idToken");
	if (idToken && idToken.trim() !== "") {
		window.location.href = "/home";
	} else {
		const loginWithGoogleBtn = document.querySelector(".google_all");
		fetch("/api/firebase-config")
			.then((response) => response.json())
			.then((config) => {
				firebase.initializeApp(config);

				var provider = new firebase.auth.GoogleAuthProvider();
				var db = firebase.firestore();

				loginWithGoogleBtn.addEventListener("click", function () {
					firebase
						.auth()
						.signInWithPopup(provider)
						.then(function (result) {
							const user = result.user;

							return user.getIdToken().then(function (idToken) {
								sessionStorage.setItem("idToken", idToken);
								console.log(idToken);

								sessionStorage.setItem("user", JSON.stringify(user));

								return db.collection("users").doc(user.uid).set({
									name: user.displayName,
									email: user.email,
									avatar: user.photoURL,
								});
							});
						})
						.then(function () {
							console.log("User info added to Firestore");
							window.location.href = "/home";
						})
						.catch(function (error) {
							console.log(error);
						});
				});
			});
	}
};
