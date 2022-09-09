const { Router } = require("express");
const userRouter = require("./user_routes");

const router = Router();

router.use(
    "/users",
    userRouter
);

router.use(
    "/business",
    userRouter
);

module.exports = router;