function datasubmit(e) {
  e.preventDefault();

  const username = document.getElementById("Username").value.trim();
  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    // User exists → try login
    if (existingUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
      alert(`Welcome, ${existingUser.name}! Redirecting to feed...`);
      window.location.href = "../index.html";
    } else {
      alert("Incorrect password!");
    }
  } else {
    alert("User not found! Please signup first.");
  }
}

document.querySelector("form").addEventListener("submit", datasubmit);
