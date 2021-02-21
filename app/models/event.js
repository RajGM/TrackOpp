const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    Name: {
        type: String,
        require: true
    },
    Category: {
        type: String,
        require: true
    },
    OrganizedBy: {
        type: String,
        require: true
    },
    Type: {
        type: String,
        require: true
    },
    Years:{type:Array,"default":[]}
});

module.exports = Profile = mongoose.model("userProfile", ProfileSchema);