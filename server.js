const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const newRoute = require("./routes/news");
const userRoute= require("./routes/users")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const CheckToken= require("./middleware/CheckToken")


app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json()); // to accept request body in json format
app.use(cors({
  origin :"http://localhost:5173",
  credentials:true
}));
app.use("/user/home",CheckToken, newRoute);
app.use("/api/user",userRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });