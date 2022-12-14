var username = prompt("Enter your username:");
var password = prompt("Enter your password:");
if (username == "admin" && password == "password") {
  alert("You have been authenticated!");
} else {
  alert("Invalid username or password");
}
var loginButton = document.createElement("button");
loginButton.innerHTML = "Login";

loginButton.addEventListener("click", function() {
});

var signUpButton = document.createElement("button");
signUpButton.innerHTML = "Sign Up";

signUpButton.addEventListener("click", function() {
  
});

document.body.appendChild(loginButton);
document.body.appendChild(signUpButton);
