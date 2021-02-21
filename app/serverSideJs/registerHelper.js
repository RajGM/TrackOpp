const regProfile = require('../models/profile');
const authToken = require('./../models/authToken');
const configFile = require('./../../myUrl');

async function findProfile(userName) {
    let MongoClient = require('mongodb').MongoClient;
    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;
    let dataArr;
    let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => console.log(err));

    try {
        const db = client.db('trackopp').collection("userprofiles");

        dataArr = await db.find({ userName }, { projection: { "_id": 0 } })
            .toArray();
    }
    catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    console.log(typeof dataArr);
    if (Object.keys(dataArr).length === 0) {
        console.log("blank");
        return "notExists"
    }
    return "exists";

}

async function createProfile(email,username, password, contactnumber) {

    let MongoClient = require('mongodb').MongoClient;
    const url = configFile.mongoURL + configFile.userName + ":" + configFile.password + configFile.restUrl;
    let client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => console.log(err));

    console.log("Before catch");
    try {
        const db = client.db('trackopp').collection("userprofiles");
        console.log("Catch point 1");

        const newProfile = new regProfile({
            email:email,
            username: username,
            password: password,
            contactnumber,contactnumber
        });

        let dbInsert = await db.insertOne(newProfile)
            .then(pro => {
                console.log("proCreated", pro);
            })
            .catch(err => {
                console.log("Profile creation problem", err);
            });

        console.log("dbInsert state:", dbInsert);

        const dbaT = client.db('trackopp').collection("authtokens");
        const authTokenDB = new authToken({
            username: username,
            authToken: ""
        });

        let authInsert = await dbaT.insertOne(authTokenDB)
            .then(aT => {
                console.log("Auth Token created", aT);
            })
            .catch(err => {
                console.log("Auth Token creation problem", err)
            });

        console.log("AuthToken state", authInsert);

    }
    catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return "profileCreated";

}

exports.findProfile = findProfile;
exports.createProfile = createProfile;