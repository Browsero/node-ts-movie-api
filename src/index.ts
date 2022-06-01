import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import home from "./routes/index";

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(`${process.env.DB_URL}`)
  .then((res) => console.log("Connection established..."))
  .catch((err) => console.error(err));

app.use("/", home);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
