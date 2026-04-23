const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT ?? 3000;

const express = require("express");
const morgan = require("morgan");
const { v1Router } = require("./api/v1/index.js");
const cookieParser = require("cookie-parser");

require("./config/database.js");

const app = express();

app.use(morgan("dev")); // request-response cycle log (status code, route, time)

app.use(express.json()); // request body parsing in json format

app.use(cookieParser()); // request cookies parsing in object format

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
    console.log("------- Server Started --------");
});
