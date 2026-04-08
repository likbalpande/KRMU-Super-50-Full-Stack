const { Router } = require("express");

const authRouter = Router();

adminRouter.use("/signup", signupController);

adminRouter.use("/login", loginController);

module.exports = { authRouter };
