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
    const { firstName, lastName, age, emailId, gender, image, password } =
      req.body; // Only
    //Encryption of the password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //i=new instance is created to  post the user
    const newUser = new User({
      firstName,
      lastName,
      age,
      emailId,
      gender,
      image,
      password: passwordHash,
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

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials!!");
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      //token jwt
      const token = await user.getJWT();
      //console.log(token);
      //Add THE token to the response BACK TO USER
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials!!");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
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
