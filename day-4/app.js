const express = require("express");
const mongoose = require("mongoose");
// const { Schema } = mongoose;

mongoose
    .connect(
        "mongodb://likhilesh-mern-1:abcd1234abcd@ac-ft5xavv-shard-00-00.ychunlm.mongodb.net:27017,ac-ft5xavv-shard-00-01.ychunlm.mongodb.net:27017,ac-ft5xavv-shard-00-02.ychunlm.mongodb.net:27017/?ssl=true&replicaSet=atlas-hovr50-shard-0&authSource=admin&appName=Cluster0",
        {
            dbName: "KRMU-super-50",
        }
    )
    .then(() => {
        console.log("----- DB Connected -----");
    })
    .catch((err) => {
        console.log("----- Error in DB Connection", err.message);
    });

const movieSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    releaseYear: Number,
    description: String,
});
const Movies = mongoose.model("Movie", movieSchema);

const app = express();

// middleware
app.use((req, res, next) => {
    console.log("-->", req.method, req.url);
    next();
});

// GET handler for "/"
app.get("/", (req, res) => {
    res.send("Hello app!");
});

// GET handler for "/users"
app.get("/users", (req, res) => {
    res.send("Hello users!");
});

app.listen(3000, () => {
    console.log("------- Server is running on http://localhost:3000 -------");
});
