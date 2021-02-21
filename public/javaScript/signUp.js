let loginFormAppearButton = document.getElementById("loginFormAppearButton");
let signupFormAppearButton = document.getElementById("signupFormAppearButton");

let signupDiv = document.getElementById("signupDiv");
let loginDiv = document.getElementById("loginDiv");

let signupsubmitButton = document.getElementById("signupsubmitButton");
let loginSubmitButton = document.getElementById("loginSubmitButton");

let username = document.getElementById("username");
let email = document.getElementById("email");
let confirmEmail = document.getElementById("confirmEmail");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let number = document.getElementById("number");

let loginUserName = document.getElementById("loginUserName");
let loginPassword = document.getElementById("loginPassword");

loginFormAppearButton.onclick = function () {
    
    if (loginDiv.style.display = "none") {
        loginDiv.style.display = "block";
    }

    signupDiv.style.display = "none";
};

signupFormAppearButton.onclick = function () {
    if (signupDiv.style.display = "") {
        signupDiv.style.display = "block";
    }

    loginDiv.style.display = "none"
};

signupsubmitButton.onclick = function(){
    console.log("Signup button clicked");
    console.log(username.value);
    console.log(email.value);
    console.log(confirmEmail.value);
    console.log(password.value);
    console.log(confirmPassword.value);
    console.log(number.value);

    var objSent = {
        username:"",
        email:"",
        password:"",
        number:""
    }

    objSent.username = username.value;
    objSent.password = password.value;
    objSent.email = email.value;
    objSent.number = number.value;

    var jsonFormat = JSON.stringify(objSent); 
    console.log(objSent);
    console.log(jsonFormat);

    try{
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
            var response = JSON.parse(this.responseText);
            console.log(response);
            if(response=="Fail"){
                console.log("Username exists");
            }else if(response=="Success"){
                console.log("Registration success");
                //window.location.href = "http://localhost:3000/login";
            }
        }
        xhttp.open("POST", "/logSign", true);
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhttp.send(jsonFormat);    
        }
        catch(err){
            console.log("Error"+err);
        }

}

loginSubmitButton.onclick = function(){
    console.log(loginUserName.value);
    console.log(loginPassword.value);

    objSent = {
        username:"",
        password:""
    };

    objSent.username = loginUserName.value;
    objSent.password = loginPassword.value;

    let jsonFormat = JSON.stringify(objSent);

    try{
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function(){
                var response = JSON.parse(this.responseText);
                console.log(this.responseText);
                console.log(response.logInfo);
                if(response.logInfo=="Fail"){
                  console.log("Incorrect User Name or password");
                }else if(response.logInfo=="Success"){
                  console.log("Correct Username and password");
                  sessionStorage.setItem("userName",response.userName);
                  sessionStorage.setItem("authToken",response.authToken);
                  userName.value="";
                  Password.value="";
                  //window.location.href = "http://localhost:3000/chatbox";
                }
        };
        xhttp.open("POST", "/logSign/login", true);
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhttp.send(jsonFormat);    
        }
        catch(err){
            console.log("Error"+err);
        }

}