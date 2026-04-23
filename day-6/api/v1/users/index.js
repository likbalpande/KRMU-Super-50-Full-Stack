const { Router } = require("express");
const { userHotelsRouter } = require("./userHotels");
const { validateUser } = require("../../../middlewares/authHandler");

const usersRouter = Router();

usersRouter.use("/hotels", validateUser, userHotelsRouter);

module.exports = { usersRouter };
