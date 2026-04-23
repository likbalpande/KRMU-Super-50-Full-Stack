const { Router } = require("express");
const { searchHotelInPlainTextController } = require("./userHotels.controller");

const userHotelsRouter = Router();

userHotelsRouter.get("/search/text", searchHotelInPlainTextController);

module.exports = { userHotelsRouter };
