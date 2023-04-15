const mongoose = require("mongoose");
const order = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  DelieveryDate: {
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
const buy = mongoose.model("buy", order);
module.exports = buy;
