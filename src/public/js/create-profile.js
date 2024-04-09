const userIcon = document.querySelector(".profile_icon");
const userName = document.querySelector(".name");

const user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
	userIcon.src = user.photoURL;
	userName.value = user.displayName;
	console.log(user);
}

const imageUpload = document.querySelector(".image_upload");
const imageSelect = document.querySelector(".image_select");

const imageSelectText = document.querySelector(".image_select p");

imageUpload.addEventListener("change", function (e) {
	const reader = new FileReader();
	reader.onload = function (e) {
		const currentImage = imageSelect.querySelector("img");
		if (currentImage) {
			imageSelect.removeChild(currentImage);
		}

		const img = document.createElement("img");
		img.classList.add("hobby_img");
		img.src = e.target.result;
		imageSelect.appendChild(img);
	};
	reader.readAsDataURL(e.target.files[0]);
	imageSelectText.style.display = "none";
});

imageSelect.addEventListener("click", function () {
	imageUpload.click();
});

const hobbySelect = document.querySelector(".hobby_select");

hobbySelect.addEventListener("click", function () {
	const span = hobbySelect.querySelector("span");
	if (span) {
		span.style.display = "none";
	}
});

const uploadBtn = document.querySelector(".ok");
const imageInput = document.querySelector(".image_upload");

uploadBtn.addEventListener("click", function () {
	const user = JSON.parse(sessionStorage.getItem("user"));
	const userId = user ? user.uid : null;
	const title = document.querySelector(".title").value;
	const description = document.querySelector(".hobby_select").innerText;
	const tags = Array.from(document.querySelectorAll(".tag_text")).map(
		(tag) => tag.value
	);
	const selectedImg = imageInput.files[0];

	if (!userId) {
		alert("ログインしてください。");
		window.location.href = "/";
		return;
	}

	if (!title || !description || tags.length === 0 || !selectedImg) {
		alert("入力した情報がたりません。");
		return;
	}

	const formData = new FormData();
	formData.append("image", selectedImg);

	fetch("/abc/upload", {
		method: "POST",
		body: formData,
	})
		.then((response) => response.text())
		.then((url) => {
			console.log(url, title, description, tags, userId);
			return fetch("/api/hobby", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					url: url,
					title: title,
					description: description,
					tags: tags,
					userId: userId,
				}),
			});
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("Hobby created successfully:", data);
			window.location.href = "/profile";
		})
		.catch((error) => {
			console.error("Error:", error);
		});
});
