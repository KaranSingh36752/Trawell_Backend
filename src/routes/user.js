const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
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
    const ALLOWED_UPDATES = [""]
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = userRouter;
