let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  window.location.href = "login/login.html";
} else {
  document.getElementById("welcomeUser").innerText =
    "Welcome, " + loggedInUser.name;
}

let postBtn = document.getElementById("postBtn");
let postsContainer = document.getElementById("postsContainer");

postBtn.addEventListener("click", function () {
  const text = document.getElementById("postText").value.trim();
  const imageURL = document.getElementById("postImage").value.trim();

  if (text === "" && imageURL === "") {
    alert("Write something or add an image!");
    return;
  }

  // Post object
  let newPost = {
    user: loggedInUser.name,
    text: text,
    image: imageURL,
    time: new Date().toLocaleString(),
    likes: 0,
    isLiked: false,
  };

  // Get previous posts
  let allPosts = JSON.parse(localStorage.getItem("allPosts")) || [];

  // Latest post top pe
  allPosts.unshift(newPost);

  // Save
  localStorage.setItem("allPosts", JSON.stringify(allPosts));

  // Clear fields
  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";

  displayPosts();
});

// =========================
//   DISPLAY POSTS FUNCTION
// =========================

function displayPosts() {
  let allPosts = JSON.parse(localStorage.getItem("allPosts")) || [];
  postsContainer.innerHTML = "";

  allPosts.forEach((post, index) => {
    const likes = post.likes || 0;
    const isLiked = post.isLiked || false;

    let postCard = document.createElement("div");
    postCard.className = "card p-3 mb-3";

    postCard.innerHTML = `
      <h5><b>${post.user}</b></h5>
      <p id="post-text-${index}">${post.text}</p>
      ${
        post.image
          ? `<img src="${post.image}" id="post-image-${index}" class="post-image rounded mb-2" />`
          : ""
      }
      <div>
        <button class="btn btn-sm btn-primary me-2" id="edit-btn-${index}">Edit</button>
        <button class="btn btn-sm btn-danger me-2" id="delete-btn-${index}">Delete</button>
        <button class="btn btn-sm btn-outline-primary" id="like-btn-${index}">
          ${isLiked ? "Unlike" : "Like"} (${likes})
        </button>        
      </div>
      <small class="text-muted">${post.time}</small>
    `;

    postsContainer.appendChild(postCard);

    // Delete button event
    document
      .getElementById(`delete-btn-${index}`)
      .addEventListener("click", () => {
        let updatedPosts = JSON.parse(localStorage.getItem("allPosts")) || [];
        updatedPosts.splice(index, 1);
        localStorage.setItem("allPosts", JSON.stringify(updatedPosts));
        displayPosts();
      });

    // Like button event
    document
      .getElementById(`like-btn-${index}`)
      .addEventListener("click", () => {
        let updatedPosts = JSON.parse(localStorage.getItem("allPosts")) || [];
        if (updatedPosts[index].isLiked) {
          updatedPosts[index].likes = (updatedPosts[index].likes || 1) - 1;
          updatedPosts[index].isLiked = false;
        } else {
          updatedPosts[index].likes = (updatedPosts[index].likes || 0) + 1;
          updatedPosts[index].isLiked = true;
        }
        localStorage.setItem("allPosts", JSON.stringify(updatedPosts));
        displayPosts();
      });

    // Edit button event
    document
      .getElementById(`edit-btn-${index}`)
      .addEventListener("click", () => {
        let postCard = document.querySelectorAll("#postsContainer .card")[
          index
        ];
        let allPosts = JSON.parse(localStorage.getItem("allPosts")) || [];
        postCard.innerHTML = `
      <h5><b>${allPosts[index].user}</b></h5>
      <textarea id="edit-textarea-${index}" class="form-control mb-2" rows="3">${
          allPosts[index].text
        }</textarea>
      <input type="text" id="edit-image-input-${index}" class="form-control mb-2" value="${
          allPosts[index].image || ""
        }" />
      <div>
        <button class="btn btn-sm btn-success me-2" id="save-btn-${index}">Save</button>
        <button class="btn btn-sm btn-secondary" id="cancel-btn-${index}">Cancel</button>
      </div>
      <small class="text-muted">${allPosts[index].time}</small>`;

        // Save handler
        document
          .getElementById(`save-btn-${index}`)
          .addEventListener("click", () => {
            const newText = document
              .getElementById(`edit-textarea-${index}`)
              .value.trim();
            const newImage = document
              .getElementById(`edit-image-input-${index}`)
              .value.trim();

            if (newText === "" && newImage === "") {
              alert("Post cannot be empty.");
              return;
            }

            let updatedPosts =
              JSON.parse(localStorage.getItem("allPosts")) || [];
            updatedPosts[index].text = newText;
            updatedPosts[index].image = newImage;
            localStorage.setItem("allPosts", JSON.stringify(updatedPosts));
            displayPosts();
          });

        // Cancel handler
        document
          .getElementById(`cancel-btn-${index}`)
          .addEventListener("click", () => {
            displayPosts();
          });
      });
  });
}

displayPosts();
