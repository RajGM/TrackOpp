const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contactnumber:{
        type:String,
        require:true
    },
    collageORworkemail:{
        type:String,
    },
    isEmailVerified:{
        type:Boolean,
        require:true
    },
    isAccessEmailVerified:{
        type:Boolean,
        require:true
    }
});

module.exports = Profile = mongoose.model("userProfile",ProfileSchema);