const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });
const app = express();
require("./db/dbconnect");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.use(require("./router/auth"));
const port = process.env.port;

app.get("/", (req, res) => {
  res.send("vijay");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
