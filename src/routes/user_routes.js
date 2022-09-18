const { Router } = require("express");
const UserController = require("../controller/user_controller");

const userRouter = Router();

userRouter.post(
    "/signup",
    UserController.signUpUser,
);

userRouter.post(
    "/login",
    UserController.loginUser,
)

userRouter.put(
    "/updateUser/:id",
    UserController.updateUser,
)

module.exports = userRouter;