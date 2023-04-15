// Required libraries and modules

const bycrypt = require("bcrypt");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const router = express.Router();
require("../db/dbconnect");
const User = require("../models/adduser");
const addshow = require("../models/addshow");
const product = require("../models/addproducts");
const order = require("../models/order");


// Router for base path

router.get("/rajrouter", (req, res) => {
  res.send("Raj router");
});

// Router for signup server
router.post("/signupserver", async (req, res) => {
  const { Name, Email, PhoneNO, Role, Password } = req.body;
  if (!Email || !Password) {
    return res.status(422).json({ error: "Something Error" });
  }
  try {
    // Check if user with given enrollment number already exists
    const userexits = await User.findOne({ Email: Email }).then(
      async (userexits) => {
        if (userexits) {
          return res.status(422).json({ error: "User already exits" });
        }

        const user = new User({
          Name,
          Email,
          PhoneNO,
          Role,
          Password,
        });
        await user.save();

        // Return success response
        res.status(201).json({ message: "Sucess" });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
router.post("/loginserver", async (req, res) => {
  try {
    const { Password, Email } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ error: "filled the data" });
    }
    const userlogin = await User.findOne({ Email: Email });

    if (userlogin) {
      const iMatch = await bycrypt.compare(Password, userlogin.Password);
      let token = await userlogin.generateAuthToken();
      res.cookie("jwttokens", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      // console.log(token);
      if (!iMatch) {
        res.status(400).json({ error: "user error" });
      } else {
        res.status(200).send({ Role: userlogin.Role });
        res.status(200).json(`User role: ${userlogin.Role}`);
        res.status(200).json({ message: "login sucess" });

        return res.send({ Role: userlogin.Role });
      }
    } else {
      res.status(400).json({ error: "user error" });
    }
  } catch (error) {
    console.log(error);
  }
});


router.post("/addproduct", async (req, res) => {
  const { ProductName, ProductShow, Description, Price, Rating } = req.body;
  if (!ProductName || !ProductShow) {
    return res.status(422).json({ error: "Something Error" });
  }
  try {
    // Check if user with given enrollment number already exists
    const productexits = await product
      .findOne({ ProductName: ProductName })
      .then(async (productexits) => {
        if (productexits) {
          return res.status(422).json({ error: "ProductName already exits" });
        }

        const productadd = new product({
          ProductName,
          ProductShow,
          Description,
          Price,
          Rating,
        });
        await productadd.save();

        // Return success response
        res.status(201).json({ message: "Sucess" });
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/order", async (req, res) => {
  const { ProductName, DelieveryDate, Size, Price } = req.body;
  if (!ProductName || !DelieveryDate) {
    return res.status(422).json({ error: "Something Error" });
  }
  try {
    // Check if user with given enrollment number already exists

    const orderproduct = new order({
      ProductName,
      DelieveryDate,
      Size,
      Price,
    });
    await orderproduct.save();

    // Return success response
    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addshow", async (req, res) => {
  const { ShowName } = req.body;
  if (!ShowName) {
    return res.status(422).json({ error: "Something Error" });
  }
  try {
    // Check if user with given enrollment number already exists
    const showexits = await addshow
      .findOne({ ShowName: ShowName })
      .then(async (showexits) => {
        if (showexits) {
          return res.status(422).json({ error: "ShowName already exits" });
        }

        const showadd  = new addshow({
          ShowName
        });
        await showadd.save();

        // Return success response
        res.status(201).json({ message: "Sucess" });
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
