const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validUpdateData } = require("../utilis/validation.js");
const userRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");

userRouter.get("/user/:id", userAuth, async (req, res) => {
  try {
    // validate my token
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

userRouter.patch("/user/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error("All fields are required.");
    }
    const loggedUser = req.user;
    const isValidPassword = await loggedUser.validatePassword(currentPassword);
    if (!isValidPassword) {
      throw new Error("Password not found.");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("Password and Confirm Password must be same");
    }
    //validation of new password through validator
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "Password should be strong (min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol)"
      );
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update user's password
    loggedUser.password = hashedPassword;
    await loggedUser.save();
    res.json({ message: "Password updated successfully", user: loggedUser });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});


userRouter.patch("/user/:id", userAuth, async (req, res) => {
  try {
    if (!validUpdateData(req)) {
      throw new Error("Invalid Update Data..");
    }
    const loggedUser = req.user;
    const updateUser = req.body;
    // console.log(loggedUser);
    Object.keys(updateUser).forEach((keys) => {
      loggedUser[keys] = updateUser[keys];
    });
    // console.log(loggedUser);
    await loggedUser.save();
    res.json({
      message: `${loggedUser.firstName} , your profile updated Sucessfully`,
      user: loggedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});


module.exports = userRouter;
