const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');

if (process.env.NODE_ENV !== "production") {
    console.log("Using dotenv development");
    require("dotenv").config({ path: "./config/config.env" });
}

// Using middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

//importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

//using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
