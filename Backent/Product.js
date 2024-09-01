const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: "string",
  price: "string",
  userId: "string",
  company: "string",
  category: "string",
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
