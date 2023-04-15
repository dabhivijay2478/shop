const mongoose = require("mongoose");
const addshow = new mongoose.Schema({
  ShowName: {
    type: String,
    required: true,
  },
});
const show = mongoose.model("show", addshow);
module.exports = show;
