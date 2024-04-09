const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const input = document.querySelector(".textarea");
	const inputValue = input.value;

	const newDiv = document.createElement("div");
	newDiv.className = "mytext";

	const newP = document.createElement("p");
	newP.textContent = inputValue;

	newDiv.appendChild(newP);

	document.querySelector(".mychat").appendChild(newDiv);

	input.value = "";
});
