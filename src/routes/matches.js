const express = require("express");
const {userAuth} = require("../middlewares/auth.js");
const matchesRouter = express.Router();

matchesRouter.post("/matches" , userAuth , async (req , res) => {
    const user = req.user;
    console.log("sendong a connection req");
    res.send(user.firstName + " sent the friend request.");
  })

module.exports = matchesRouter;