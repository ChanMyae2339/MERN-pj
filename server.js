const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const newRoute = require("./routes/news");
const app = express();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;



app.use(morgan("dev"));
app.use(express.json()); // to accept request body in json format
app.use("/user/home", newRoute);
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });