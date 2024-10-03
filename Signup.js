// Grabbing input fields
let email = document.querySelector("#email");
let password = document.querySelector("#password");

// Grabbing spans for validation messages
let cemail = document.querySelectorAll("span")[0];
let cpassword = document.querySelectorAll("span")[1];

// Grabbing form
let form = document.querySelector("form");

// Local storage for registered users (assumes you stored user data during signup)
let registeredUsers = JSON.parse(localStorage.getItem("data"));

// Add form submit event listener
form.addEventListener("submit", (e) => {
    let flag = true;

    // Email Validation
    if (email.value === "") {
        cemail.innerText = "Email required";
        cemail.style.color = "red";
        e.preventDefault();
        flag = false;
    } else {
        cemail.innerText = "";
    }

    // Password Validation
    if (password.value === "") {
        cpassword.innerText = "Password is required";
        cpassword.style.color = "red";
        e.preventDefault();
        flag = false;
    } else {
        cpassword.innerText = "";
    }

    // Validate against registered users in localStorage
    if (flag && registeredUsers) {
        let userFound = registeredUsers.find(user => user.email === email.value && user.pass === password.value);

        if (!userFound) {
            e.preventDefault();
            cpassword.innerText = "Invalid email or password";
            cpassword.style.color = "red";
        }
    } else if (!registeredUsers) {
        e.preventDefault();
        cpassword.innerText = "No registered users found";
        cpassword.style.color = "red";
    }
});
