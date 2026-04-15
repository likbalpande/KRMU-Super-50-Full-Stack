const { Router } = require("express");
const { signupController, loginController } = require("./auth.controllers");

const authRouter = Router();

authRouter.use("/signup", signupController);
authRouter.use("/login", loginController);

module.exports = { authRouter };
