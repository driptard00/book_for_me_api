const Users = require("../mongoose_models/user_model");
const JoiValidator = require("../utils/joi_validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// DB connection
const env = process.env.NODE_ENV || "development";
require("../config/db_config")[env];


class UserController{
    static signUpUser = async (req, res) => {
        try {
            const requestBody = req.body;

            // validate request body
            const {error, value} = JoiValidator.userSignUpSchema.validate(requestBody);

            if(error){
                return res.status(400).json({
                    "success": false,
                    "code": 400,
                    "message": `${error.message}`
                })
            }
            const existUser = await Users.findOne({ email: value.email })
            // check if user exists
            if(existUser){
                return res.status(409).json({
                    "success": false,
                    "code": 409,
                    "message": "User already exists"
                })
            }
            
            // encrypt password before saving
            const ePassword = bcrypt.hashSync(value.password, 10)
            
            // create user
            const savedUser = await Users.create({ ...value, password: ePassword })
            return res.status(201).json({
                "success": true,
                "code": 201,
                "message": "Sign up successful",
                "data": savedUser
            })
        } catch (error) {
            console.log(`ERROR::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "Server error please try again",
            })
        }
    }

    static loginUser = async (req, res) => {
        try {
            const requestBody = req.body;
            const {error, value} = JoiValidator.userLoginUserSchema.validate(requestBody);
            if(error){
                return res.status(400).json({
                    "success": false,
                    "code": 400,
                    "message": `${error.message}`
                })
            }

            const existUser = await Users.findOne({ email: value.email });
            // check if user exists
            if(!existUser){
                return res.status(404).json({
                    "success": false,
                    "code": 404,
                    "message": "User does not exist"
                })
            }
            const { id, fullname, email, phonenumber } = existUser;

            // decrypt the password to check if it matches the saved one
            const passwordMatch = bcrypt.compareSync(value.password, existUser.password);
            if(!passwordMatch){
                return res.status(409).json({
                    "success": false,
                    "code": 409,
                    "message": "Incorrect password, please try again"
                })
            }

            // Create a token for the user
            const token = jwt.sign(
                { id, fullname, email, phonenumber },
                `${process.env.JWT_SECRET_KEY}`,
                {expiresIn: "1d"}
            );

            return res.status(200).json({
                "success": true,
                "code": 200,
                "message": "Login successful",
                "data": { ...existUser.toObject(), token },
            })
        } catch (error) {
            console.log(`ERROR::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "Server error please try again",
            })
        }
    }

    static updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const requestBody = req.body;
            
            const { error, value } = JoiValidator.userUpdateSchema.validate(requestBody);
            if (error) {
                return res.status(400).json({
                    "success": false,
                    "code": 400,
                    "message": `${error.message}`,
                })
            }

            const user = await Users.findByIdAndUpdate(
                { _id: id },
                { ...value }
            )
            if (!user) {
                return res.status(404).json({
                    "success": false,
                    "code": 404,
                    "message": `User does not exist`,
                })
            }

            const { fullname, email, phonenumber } = user;

            // Create a token for the user
            const token = jwt.sign(
                { id, fullname, email, phonenumber },
                `${process.env.JWT_SECRET_KEY}`,
                {expiresIn: "1d"}
            );

            return res.status(200).json({
                "success": true,
                "code": 200,
                "message": "Updated successfully",
                "data": { ...user.toObject(), token },
            })
        } catch (error) {
            console.log(`ERROR::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "Server error please try again",
            })
        }
    }

    static getSingleUser = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findById({ _id: id });

            if (!user) {
                return res.status(404).json({
                    "success": false,
                    "code": 404,
                    "message": "User does not exist",
                })
            }
            return res.status(200).json({
                "success": true,
                "code": 200,
                "message": "User retrieved successfully",
                "data": user
            })
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



// class UserController{
//     static allUsers = async (req, res) => {
//         try {

//             let myData;
//             // check if user exists
//             const data = connection.query(
//                 'SELECT * FROM users',
//                 function(err, results){

//                     myData = results
//                     if (err) {
//                         return err
//                     }else{
//                     return results
//                     }
//                 }
//             );
//             // if(!results){
//             //     return res.status(409).json({
//             //         "success": false,
//             //         "code": 409,
//             //         "message": "User not found."
//             //     })
//             // }
             
//                console.log(myData)
            
//             // return res.status(200).json({
//             //     "success": true,
//             //     "code": 200,
//             //     "message": "User gotten",
//             //     "data": data
//             // })
//         } catch (error) {
//             console.log(`ERROR::::${error}`);

//             return res.status(500).json({
//                 "success": false,
//                 "code": 500,
//                 "message": "Server error please try again",
//             })
//         }
//     }
// }

module.exports = UserController;