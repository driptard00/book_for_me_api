const Joi = require("joi");
require("../mongoose_models/user_model");
// require("../src/mongoose_models/business_model");
require("../config/db_config");

class JoiValidator{

    // USERS
    static userSignUpSchema = Joi.object({
        fullname: Joi.string().required().min(2),
        email: Joi.string().required().email(),
        password: Joi.string().required()
        .pattern( new RegExp('[a-zA-Z0-9]{8,20}$'))
        .error( new Error("Password must have at least 8 characters and alphanumberic.")),
        profilepicture: Joi.string(),
        phonenumber: Joi.string().required(),
        role: Joi.string().required(),
    }) 

    static userLoginUserSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

    static userUpdateSchema = Joi.object({
        fullname: Joi.string().min(2),
        profilepicture: Joi.string(),
        email: Joi.string().email(),
        phonenumber: Joi.string(),
    })


    //  BUSINESS
    static businessRegistrationSchema = Joi.object({
        businessName: Joi.string().required().min(2),
        businessLogo: Joi.string(),
        businessAddress: Joi.string().required(),
        businessPhoneNumber: Joi.string().required(),
        businessEmail: Joi.string().required().email,
        businessType: Joi.string().required(),
        businessDescription: Joi.string(),
        businessMenu: Joi.object(),
    })
}

module.exports = JoiValidator;