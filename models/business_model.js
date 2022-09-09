const mongoose = require("mongoose");

// Crrate business schema
const businessSchema = mongoose.Schema({
    businessName: {type: String, required: true,},
    businessLogo: {type: String, required: false,},
    businessAddress: {type: String, required: true},
    businessPhoneNumber: {type: String, required: true},
    businessEmail: {type: String, required: true},
    businessType: {type: String, required: true},
    businessDescription: {type: String, required: false,},
    businessMenu: {type: Map, of: Array ,required: false,},
}, {timeStamps: true})

const businessModel = mongoose.model("Business", businessSchema);

module.exports = businessModel