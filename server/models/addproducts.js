const mongoose = require("mongoose");
const addproducts = new mongoose.Schema({
  
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  show: { type: String, required: true },
  color: { type: String, required: true },
  saleDiscount: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
});
const products = mongoose.model("product", addproducts);
module.exports = products;
