const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validUpdateData } = require("../utilis/validation.js");
const userRouter = express.Router();

userRouter.get("/user/:id", userAuth, async (req, res) => {
  try {
    // validate my token
    const user = req.user;
    res.send(user);
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
    user: loggedUser});
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = userRouter;
