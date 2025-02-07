const express = require("express");
const { validSignUpData } = require("../utilis/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

//Post the data with dynamic nature
authRouter.post("/signup", async (req, res) => {
  // VAlidation of signup user at api level validation
  try {
    validSignUpData(req);
    const { firstName, lastName, age, emailId, gender, image, password ,about } =
      req.body; // Only
    //Encryption of the password

    // const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //i=new instance is created to  post the user
    const newUser = new User({
      firstName,
      lastName,
      age,
      emailId,
      gender,
      image,
      password,
      about
    });

    await newUser.save();
    res.send("Data added successfully.");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId) {
      throw new Error("Email not present!!");
    }

    // Convert email to lowercase before querying (matches schema)
    const user = await User.findOne({ emailId: emailId.toLowerCase() });

    // Debugging output to check if the user is found
    // console.log("User found:", user);

    if (!user) {
      throw new Error("Invalid credentials!!");
    }

    // Check if password is valid
    const isValidPassword = await user.validatePassword(password);

    // Debugging output to check password validation
    // console.log("Entered Password:", password);
    // console.log("Hashed Password in DB:", user.password);
    // console.log("Password Match:", isValidPassword);

    if (!isValidPassword) {
      throw new Error("Invalid credentials!!");
    }

    // Generate JWT token
    const token = await user.getJWT();

    // Set token in cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.send(user);
  } catch (err) {
    console.error("Login Error:", err.message); // Log errors for debugging
    res.status(400).send(err.message);
  }
});



authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Successfull");
});

module.exports = authRouter;
