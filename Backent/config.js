const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/e-comrace");
    console.log("Data Base connect sucessecfully ");
  } catch (error) {
    console.log("data base is not connect");
  }
}

module.exports = connectDB;
