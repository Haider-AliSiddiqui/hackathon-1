const username = document.getElementById("Username");
const email = document.getElementById("Email");
const password = document.getElementById("password");

function datasubmit() {

  // Pehle local storage se purana data lao
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check karo ke email already exists to nahi
  const isUserExist = users.some((user) => user.email === email.value);

  if (isUserExist) {
    alert("User already exists with this email!");
    return;
  }

  // New user object
  const newUser = {
    name: username.value,
    password: password.value,
    email: email.value,
  };

  // Add new user
  users.push(newUser);

  // Dobara localStorage me set karo
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
}
