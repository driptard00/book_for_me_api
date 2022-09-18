const { Router } = require("express");
const BusinessController = require("../controller/business_controller");

const businessRouter = Router();

businessRouter.post(
    "/register",
    BusinessController.registerBusiness
)


module.exports = businessRouter;