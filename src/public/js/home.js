window.onload = function () {
	const main = document.querySelector(".main");
	fetch("/api/hobbies")
		.then((response) => response.json())
		.then((data) => {
			data.forEach((hobby) => {
				const html = `
                <div class="profileCard">
                    <div class="topText">
                        <span></span>
                        <p>${hobby.title}</p>
                        <div class="gradationText"></div>
                    </div>
                    <div class="card">
                        <div class="profileContent">
                            <div class="profileImg">
                                <img src="${hobby.img}" alt="" />
                            </div>
                            <div class="profileInfo">
                                <div class="userIcon">
                                    <img src="${hobby.userAvatar}" alt="icon" width="80" height="80"/>
                                </div>
                                <div class="bio">
                                    <div class="profileTag">
                                        <div class="tag">${hobby.tags.tag1}</div>
                                        <div class="tag">${hobby.tags.tag2}</div>
                                    </div>
                                    <div class="name">${hobby.userName}<span>さん</span></div>
                                    <div class="desTitle">${hobby.title}</div>
                                    <div class="des1">${hobby.description}</div>
                                </div>
                            </div>
                        </div>
                        <div class="bioDesCard">
                            <div class="title">${hobby.title}</div>
                            <div class="des2">${hobby.description}</div>
                        </div>
                    </div>
                    <div class="buttonBox">
                        <div class="like"></div>
                        <div class="match">話してみる？</div>
                    </div>
                </div>
            `;
				const template = document.createElement("template");
				template.innerHTML = html.trim();
				const newElement = template.content.firstChild;

				const des1 = newElement.querySelector(".des1");
				if (des1.innerText.length > 70) {
					des1.innerText = des1.innerText.slice(0, 70) + "...";
				}

				const desTitle = newElement.querySelector(".desTitle");
				if (desTitle.innerText.length > 20) {
					desTitle.innerText = desTitle.innerText.slice(0, 20) + "...";
				}

				const card = newElement.querySelector(".profileCard .card");
				card.addEventListener("click", function () {
					this.style.transform =
						this.style.transform === "rotateY(180deg)"
							? "rotateY(0)"
							: "rotateY(180deg)";
				});

				const matchBtn = newElement.querySelector(".match");
				matchBtn.addEventListener("click", function () {
					window.location.href = "/chat-new";
				});

				main.appendChild(newElement);
			});
		})
		.catch((error) => console.error("Error:", error));
};
