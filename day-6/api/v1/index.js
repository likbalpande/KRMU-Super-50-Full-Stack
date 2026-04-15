const { Router } = require("express");
const { adminRouter } = require("./admin");
const { authRouter } = require("./auth");

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter); //validateAdmin,
// v1Router.use("/", userRouter);

module.exports = { v1Router };
