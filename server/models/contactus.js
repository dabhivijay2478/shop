const mongoose = require("mongoose");
const contactschemas = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Message: {
    type: String,
    required: true,
  },
});
const contact = mongoose.model("contact", contactschemas);
module.exports = contact;
