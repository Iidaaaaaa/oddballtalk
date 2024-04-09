const user = JSON.parse(sessionStorage.getItem("user"));
const userId = user.uid;

const profileBox = document.querySelector(".profile_all section");

fetch("/api/my-hobbies", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({ userId: userId }),
})
	.then((response) => response.json())
	.then((data) => {
		data.forEach((item) => {
			const tags = Object.values(item.tags);
			const html = `
            <article class="profile">
                <img class="profile_icon" src="${item.img}" alt="アイコン" />
                <div class="profile_text">
                    <a href="/create-profile">
                        <h3>${user.displayName}</h3>
                        <ul class="tag_all">
                            ${tags
															.map((tag) => `<li class="tag">${tag}</li>`)
															.join("")}
                        </ul>
                        <p class="text">
                            ${item.description}
                        </p>
                    </div>
                    <svg class="editicon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -1 14 14" fill="none">
                        <rect x="9.89941" width="4.48" height="1.12" transform="rotate(45 9.89941 0)" fill="#3D5C8A"/>
                        <path d="M8.71143 1.18799L11.8793 4.35583L4.91002 11.3251L1.58379 11.4835L1.74218 8.15723L8.71143 1.18799Z" fill="#3D5C8A"/>
                    </svg>
                    </a>
            </article>`;
			const template = document.createElement("template");
			template.innerHTML = html.trim();
			profileBox.prepend(template.content.firstChild);
			const text = document.querySelector(".text");
			if (text.innerText.length > 25) {
				text.innerText = text.innerText.slice(0, 25) + "...";
			}
		});
	})
	.catch((error) => {
		console.error("Error:", error);
	});
