// Get logged-in user
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(!loggedInUser) {
  // Agar koi user login nahi hai to login page redirect
  window.location.href = "login/login.html";
} else {
  document.getElementById("welcomeUser").innerText = "Welcome, " + loggedInUser.name;
}

