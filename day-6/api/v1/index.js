const { Router } = require("express");
const { adminRouter } = require("./admin");

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/admin", validateAdmin, adminRouter);
// v1Router.use("/", userRouter);

module.exports = { v1Router };
