const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
// const DB = process.env.DATABASE;
const DB = "mongodb://0.0.0.0:27017/rajcp";
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });
