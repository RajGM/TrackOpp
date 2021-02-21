console.log("Login page js is loading");

let loginUserName = document.getElementById("loginUserName");
let loginPassword = document.getElementById("loginPassword");
let loginSubmitButton = document.getElementById("loginSubmitButton");

loginSubmitButton.onclick = function(){
    console.log(loginUserName.value);
    console.log(loginPassword.value);

    var objSent = {
        username:"",
        password:""
    }

    objSent.username = loginUserName.value;
    objSent.password = loginPassword.value;

    var jsonFormat = JSON.stringify(objSent); 

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
              //userName.value="";
             // Password.value="";
             // window.location.href = "http://localhost:3000/chatbox";
            }
    };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(jsonFormat);    
    }
    catch(err){
        console.log("Error"+err);
    }

}