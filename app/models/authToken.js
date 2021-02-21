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
    authToken:{
        type:String,
        require:true
    },
    authExpire:{
        type:Object,
        require:true
    }
});

module.exports = authT = mongoose.model("authToken",ProfileSchema);