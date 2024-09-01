const express = require("express");
const Users = require("./users");
const products = require("../Backent/Product");
const verifyToken = require("./varifyToken");
const connectDB = require("./config");

const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtkey = require("./e-com"); // Import the secret key from e-com.js

const app = express();
const PORT = process.env.PORT || 5000;

//Data base
connectDB();

// For cors error
app.use(cors());
//middle ware
app.use(express.json());

//Route for user Registeration
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ result: "Email and password are required" });
    }
    // Create a new user with the provided data
    const newUser = new Users(req.body);

    // Save the new user to the database
    let person = await newUser.save();

    // Convert Mongoose document to plain JavaScript object

    // Remove the password field before sending the response
    delete person.password;

    // Send the user object without the password
    jwt.sign({ userid: person._id }, jwtkey, (error, token) => {
      if (error) {
        res.send({ error: "email or password are required" });
      }
      res.send({
        person: person,
        auth: token,
      });
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (e.g., email already exists)
      res.status(400).send({ message: "Email already exists" });
    } else {
      // Other errors
      res.status(500).send({ message: "An error occurred" });
    }
  }
});

//Route for login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      let user = await Users.findOne({ email, password }).select("-password");
      if (user) {
        jwt.sign(
          { userId: user._id }, // Payload: the data you want to include in the token
          jwtkey, // Secret key for signing the token

          (error, token) => {
            if (error) {
              return res.send({ result: "Something went wrong" }); // Handle error
            }
            res.send({
              user: { ...user.toObject(), password: undefined },
              auth: token,
            }); // Send user and token
          }
        );
      }
    } else {
      res.send({ result: "Email and password are required" });
    }
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Route For Product

app.post("/add-product", verifyToken, async (req, res) => {
  try {
    // Validate the product data here if necessary

    // Create a new product instance
    let user = new products(req.body);

    // Save the product to the database
    let result = await user.save();

    // Send a success response
    res.status(201).send({
      success: true,
      message: "Product added successfully!",
      data: result,
    });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).send({
      success: false,
      message: "Failed to add product.",
      error: error.message,
    });
  }
});
app.get("/products", async (req, res) => {
  try {
    let product = await products.find();
    if (product.length > 0) {
      res.send(product);
    } else {
      res.send({ error: "No products found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});
//delete Product
app.delete("/product/:id", async (req, res) => {
  const result = await products.deleteOne({ _id: req.params.id });
  res.send(result);
});
const mongoose = require("mongoose");

app.get("/product/:id", async (req, res) => {
  try {
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "Invalid ID format" });
    }

    const result = await products.findOne({ _id: req.params.id });

    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ error: "ID not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});
//update products
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format if needed (e.g., for MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid product ID." });
    }

    // Perform the update operation
    const result = await products.updateOne(
      { _id: id },
      {
        $set: req.body,
      }
    );

    // Check if any document was actually updated
    if (result.nModified === 0) {
      return res
        .status(404)
        .send({ error: "Product not found or no changes made." });
    }

    res.send({ success: true, message: "Product updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the product." });
  }
});
//search
app.get("/search/:key", verifyToken, async (req, res) => {
  try {
    let result = await products.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } }, // Case-insensitive search
        { price: { $regex: req.params.key, $options: "i" } },
        { company: { $regex: req.params.key, $options: "i" } },
        { category: { $regex: req.params.key, $options: "i" } },
      ],
    });

    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while searching." });
  }
});
//varify token

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
