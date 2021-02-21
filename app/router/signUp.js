const express = require('express');
const router = new express.Router();
var path = require('path');
const registerHelper = require('./../serverSideJs/registerHelper');
const helperFunction = require('./../serverSideJs/loginHelper');

router.get('/', function (req, res) {
    console.log("Sending LogSign page");
    res.sendFile(path.join(__dirname + './../views/' + 'signUp.html'));
});

router.post('/', async (req, res) => {
    console.log("Posting request");
    console.log(req.body);
    const profileValues = { email:"", username: "", password: "", contactnumber:"", };
    if (req.body.username != "" && req.body.password != "") {
        profileValues.username = req.body.username;
        profileValues.password = req.body.password;
        profileValues.email = req.body.email;
        profileValues.contactnumber = req.body.number;
    }

    let fpv = await registerHelper.findProfile(profileValues.username);
    console.log("fpv:", fpv);
    if(fpv=="exists"){
        console.log("Profile exists cannot create new");
        res.status(200).json("Profile exists");
    }else{
        let cpv = await registerHelper.createProfile(profileValues.email,profileValues.username,profileValues.password,profileValues.contactnumber);
        console.log(cpv);
        res.status(200).json("Success");
    }

});

router.post('/login', async (req,res)=>{
    const profileValues = { username: "", password: "" };
    if (req.body.username != "" && req.body.password != "") {
        profileValues.username = req.body.username;
        profileValues.password = req.body.password;
    }

    console.log("Values in server object");
    console.log(profileValues);

    let loginState = await helperFunction.loginProfile(profileValues.username,profileValues.password);
    console.log("loginState",loginState);
    
    let responseObj = {
        logInfo:"",
        userName:"",
        authToken:""
    }
    
    if(loginState=="correct"){
        responseObj.logInfo="Success";
        responseObj.userName=profileValues.username;
        responseObj.authToken="ABCDEFG"; 
    }else if(loginState=="incorrect"){
        responseObj.logInfo="Fail";
    }else if(loginState=="notExists"){
        responseObj.logInfo="Fail";
    }
    
    res.status(200).json(responseObj);
});

module.exports = router;