const mongoose = require("mongoose");
const addproducts = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  ProductShow: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
  },
});
const products = mongoose.model("product", addproducts);
module.exports = products;
