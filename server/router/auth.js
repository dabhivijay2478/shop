// Required libraries and modules

const bycrypt = require("bcrypt");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./email.env" });

const router = express.Router();
require("../db/dbconnect");
const User = require("../models/adduser");
const addshow = require("../models/addshow");

const order = require("../models/order");
const Contact = require("../models/contactus");
// Router for base path

router.get("/rajrouter", (req, res) => {
  res.send("Raj router");
});

// Router for signup server
router.post("/signupserver", async (req, res) => {
  const { Name, Email, PhoneNO, Password } = req.body;
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
          Role: "User",
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
router.post("/adminadduser", async (req, res) => {
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

const products = require("../models/addproducts");

router.post("/addproduct", async (req, res) => {
  const { name, show, brand, size, color, saleDiscount, price, rating, image } =
    req.body;
  if (!name || !show) {
    return res.status(422).json({ error: "Something Error" });
  }
  try {
    // Check if product with given name already exists
    const productExists = await products
      .findOne({ name: name })
      .then(async (productExists) => {
        if (productExists) {
          return res.status(422).json({ error: "Product name already exists" });
        }

        const productAdd = new products({
          name,
          show,
          brand,
          size,
          color,
          saleDiscount,
          price,
          rating,
          image,
        });
        await productAdd.save();

        // Return success response
        res.status(201).json({ message: "Success" });
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

        const showadd = new addshow({
          ShowName,
        });
        await showadd.save();

        // Return success response
        res.status(201).json({ message: "Sucess" });
      });
  } catch (error) {
    console.log(error);
  }
});

router.post("/addquize", async (req, res) => {
  try {
    // const users = await csvtojson().fromString(req.body);
    const shows = await req.body;
    for (let i = 0; i < shows.length; i++) {
      const user = new addshow({
        ShowName: shows[i].ShowName,
        Question: shows[i].Question,
        Answer: shows[i].Answer,
      });

      await user.save();
    }

    res.status(200).json({ message: "ShowName added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/productdata", async (req, res) => {
  const result = await products.find({});

  res.send(result);
});

router.get("/userdata", async (req, res) => {
  const result = await User.find({});

  res.send(result);
});

router.post("/addmutlipleproduct", async (req, res) => {
  try {
    // const users = await csvtojson().fromString(req.body);
    const mutlipleproduct = await req.body;
    for (let i = 0; i < mutlipleproduct.length; i++) {
      const user = new products({
        name: mutlipleproduct[i].name,
        brand: mutlipleproduct[i].brand,
        size: mutlipleproduct[i].size,
        show: mutlipleproduct[i].show,
        color: mutlipleproduct[i].color,
        saleDiscount: mutlipleproduct[i].saleDiscount,
        price: mutlipleproduct[i].price,
        rating: mutlipleproduct[i].rating,
        image: mutlipleproduct[i].image,
      });

      await user.save();
    }

    res.status(200).json({ message: "ProductName's added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/Contactus", async (req, res) => {
  const { Name, Email, Message } = req.body;

  try {
    const Contactus = new Contact({
      Name,
      Email,
      Message,
    });
    await Contactus.save();

    // if (userRegister) {
    res.status(201).json({ message: "Sucess" });
    // }
    // else
    // {
    // res.status(201).json({message:"failed"})
    // }
  } catch (error) {
    console.log(error);
  }
});

router.get("/contactusreport", async (req, res) => {
  const result = await Contact.find({});

  res.send(result);
});

router.post("/check", (req, res) => {
  const { Question, Answer } = req.body;

  addshow
    .findOne({ Question: Question })
    .exec()
    .then((show) => {
      if (!show) {
        res.status(404).send("Question not found");
      } else if (show.Answer === Answer) {
        res.send("Answer is correct!");
      } else {
        res.send("Answer is incorrect");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

router.get("/fetchquiz", async (req, res) => {
  const result = await addshow.find({}).limit(3);

  res.send(result);
});

router.delete("/deleteproducts/:name", function (req, res) {
  products
    .deleteOne({ name: req.params.name })
    .then(() => res.send("Product deleted successfully."))
    .catch((err) => res.status(500).send(err));
});

const nodemailer = require("nodemailer");
router.post("/sendemail", async (req, res) => {
  const FromEmail = process.env.MAIL_USERNAME;
  const Password = process.env.MAIL_PASSWORD;
  const { ToEmail, password } = req.body;
  console.log(ToEmail);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: FromEmail,
      pass: Password,
    },
  });

  let mailOptions = {
    from: FromEmail,
    to: ToEmail,
    subject: "Your Account Has Been Created!",
    html: `    <p>Dear ${ToEmail},</p>
    <p>Thank you for registering with our platform! We're excited to have you on board.</p>
    <p>Your account has been successfully created and is now ready for use. You can log in to your account using the following credentials:</p>
    <ul>
      <li>Email: ${ToEmail}</li>
      <li>Password: ${password}</li>
    </ul>
    <p>If you have any questions or encounter any issues, please don't hesitate to reach out to our support team. We are always here to assist you.</p>

    
    <p>Thank you again for joining our platform. We look forward to serving you!</p>
    <p>Best regards,<br>[Raj's Creation]</p>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
