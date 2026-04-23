const { Router } = require("express");
const { authRouter } = require("./auth/index.js");
const { adminRouter } = require("./admin");
const { validateUser } = require("../../middlewares/authHandler.js");
const { validateAdmin } = require("../../middlewares/validateAdmin.js");
const { usersRouter } = require("./users/index.js");

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/admin", validateUser, validateAdmin, adminRouter);
v1Router.use("/users", usersRouter);

module.exports = { v1Router };
