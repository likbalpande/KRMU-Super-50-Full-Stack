const { Router } = require("express");
const { authRouter } = require("./auth/index.js");
const { adminRouter } = require("./admin");
const { authRouter } = require("./auth");

const v1Router = Router();

v1Router.use("/auth", authRouter);
// v1Router.use("/admin", validateAdmin, adminRouter);
// v1Router.use("/", userRouter);

module.exports = { v1Router };
