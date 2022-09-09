const Business = require("../models/business_model")
const JoiValidator = require("../utils/joi_validator");

// DB connection
const env = process.env.NODE_ENV || "development";
require("../config/db_config")[env];


class BusinessController{
    static registerBusiness = async (req, res) => {
        try {
            const requestBody = req.body;

            const { error, value } = JoiValidator.businessRegistrationSchema.validate(requestBody);
            if (error) {
                return res.status(400).json({
                    "success": false,
                    "code": 400,
                    "message": `${error.message}`
                })
            }

            // Check if business exists
            const existBusiness = await Business.findOne(
                { businessName: value.businessName }
            );
            if (existBusiness) {
                return res.status(409).json({
                    "success": false,
                    "code": 409,
                    "message": `Business Name is already taken`
                })
            }

            // Create Business
            const savedBusiness = await Business.create(
                { ...value }
            )
            if (savedBusiness) {
                return res.status(201).json({
                    "success": true,
                    "code": 201,
                    "message": `Business Successfully Created`,
                    "data": savedBusiness
                })
            }
        } catch (error) {
            console.log(`ERROR::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "Server error please try again",
            })
        }
    }
}

module.exports = BusinessController;