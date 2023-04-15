const mongoose = require("mongoose");
const addcart = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  ProductShow: {
    type: String,
    required: true,
  },
  Size: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});
const cart = mongoose.model("cart", addcart);
module.exports = cart;
