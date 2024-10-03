// let form = document.querySelector("form");
// let userName = document.querySelectorAll("input")[0];
// let password = document.querySelectorAll("input")[1];
// let eUser = document.querySelectorAll("span")[0];
// let ePass = document.querySelectorAll("span")[1];
// let eSubmit = document.querySelectorAll("span")[2];
// let e2Submit = document.querySelector("#succ");
// let localData = JSON.parse(localStorage.getItem("data"));

// console.log(localData)
// console.log(eUser, ePass, eSubmit);

// // form.addEventListener("submit", (e)=>{
// //     e.preventDefault();
//     // console.log(userName.value, password.value);
//     // if(userName.value == "devesh@gmail.com" && password.value==123456789){
//     //     alert("Login Successful");
//     // }
// //     else if(userName.value=="" && password.value==""){
// //         alert("username & Password Required")
// //     }
// //     else if(userName.value !='' && password.value==""){
// //         alert("password is required");
// //     }
// //     else if(userName.value =='' && password.value!=""){
// //         alert("username is required");
// //     }
// //     else{
// //         alert("OPPS! Invalid Credentials")
// //     }
// // })

// form.addEventListener("submit", (e)=>{
//     eUser.innerHTML ="";
//     ePass.innerHTML="";
//     eSubmit.innerHTML="";
//     // e.preventDefault();
//     let matching = localData.find((e)=>{
//         if(userName.value== e.emil && password.value == e.pass){
//             return e;
//         }
//     });
//     console.log(matching);
   

//         // e.preventDefault();

//      if(userName.value=="" && password.value==""){
//         eUser.innerHTML = "Username required";
//         ePass.innerHTML = "Password required";
//         eSubmit.innerHTML = " Something is missing";
//         e.preventDefault();
//     }
//     else if(userName.value==""){
//         eUser.innerHTML = "Username required";
//         eSubmit.innerHTML = "Something is missing";
//         e.preventDefault();

//     }
//     else if(password.value==""){
//         ePass.innerHTML = "Password required";
//         eSubmit.innerHTML = "Something is missing";
//         e.preventDefault();
//     }
//     else if(matching){
//         alert("boss welcome to the page")
//         localStorage.setItem("particularUser",JSON.stringify(matching))
//     }
//     else{
//         eSubmit.innerHTML = "Incorrect username and password";
//         e.preventDefault();
//     }
// })


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
