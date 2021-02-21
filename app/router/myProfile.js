const express = require('express');
const router = new express.Router();
var path = require('path');

router.get('/', function (req, res) {
    console.log("Sending myProfile page");
    res.sendFile(path.join(__dirname + './../views/' + 'myProfile.html'));
});

/*
router.post('/', async (req, res) => {
    console.log("Posting request");
    console.log(req.body);
    const profileValues = { username: "", password: "" };
    if (req.body.username != "" && req.body.password != "") {
        profileValues.username = req.body.userName;
        profileValues.password = req.body.Password;
    }

    //console.log("Values in server object");
    //console.log(profileValues);

    let fpv = await registerHelper.findProfile(profileValues.username);
    console.log("fpv:", fpv);
    if(fpv=="exists"){
        console.log("Profile exists cannot create new");
        res.status(200).json("Profile exists");
    }else{
        let cpv = await registerHelper.createProfile(profileValues.username,profileValues.password);
        console.log(cpv);
        res.status(200).json("Success");
    }

});
*/
module.exports = router;
