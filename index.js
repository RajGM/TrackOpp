const express = require('express');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
//const indexHelper = require('./app/serverSideJs/indexHelper');

// Define our application
const app = express();

// Set 'port' value to either an environment value PORT or 3000
app.set('port', process.env.PORT || 8000);

app.use(express.static(__dirname + '/public'));

//Middleware for bodyparser
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

//mongodb connect
//const configFile = require('./myUrl.js');
//const db = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

/*
mongoose
  .connect(db)
  .then(() => console.log("Connected Successfully"))
  .catch(err => console.log(err));

*/

// Router listens on / (root)
var route = require('./router');
app.use('/', route);

var addEvent = require('./app/router/addEvent');
app.use('/addEvent',addEvent);

var logSign = require('./app/router/signUp');
app.use('/signUp',logSign);

var login = require('./app/router/login');
app.use('/login',login);

var myProfile = require('./app/router/myProfile');
app.use('/myProfile',myProfile);

//mongodb connect
const configFile = require('./myUrl.js');
const db = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;

mongoose
  .connect(db)
  .then(() => console.log("Connected Successfully with Database"))
  .catch(err => console.log(err));

//var server = app.listen() 

app.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
  console.log("You application is running. You should be able to connect to it on http://localhost:" + app.get('port'));
});
