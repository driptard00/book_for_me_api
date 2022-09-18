// import important modules
const mongoose = require("mongoose")

// create model schema
const userSchema = mongoose.Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profilepicture: {type: String, required: false},
    phonenumber: {type: String, required: true},
    role: {type: String, required: true},
}, { timeStamps: true } );

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;

