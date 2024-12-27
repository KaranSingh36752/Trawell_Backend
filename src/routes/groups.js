const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Group = require("../models/group.js");
const groupRouter = express.Router();

groupRouter.post("/group/create", userAuth, async (req, res) => {
  try {
    const {
      groupName,
      description,
      maxMembers,
      destination,
      travelDate,
    } = req.body;

    if(!groupName || !maxMembers || !destination || !travelDate) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }
    // const loggedUser = req.user;
    // const adminName = loggedUser.firstName;
    const group = new Group({
      groupName,
      description,
      groupAdmin: req.user._id,
      maxMembers,
      destination,
      travelDate,
      groupMembers: [{ user: req.user._id, isVerified: true }],
      status: "open",
    })


    await group.save();
    const populatedGroup = await Group.findById(group._id).populate("groupAdmin" ,
        "firstName lastName emailId"
    ).populate("groupMembers.user" , "firstName lastName emailId" );

    res.status(201).json({ group : populatedGroup, message: "Group created successfully" });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = groupRouter;
