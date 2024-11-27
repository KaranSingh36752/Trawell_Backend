const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const matchesRouter = express.Router();
//api to send a connection request
matchesRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["like", "pass"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      //check the User even present
      const findToUserId = await User.findById(toUserId);
      if (!findToUserId) {
        return res.status(404).json({ message: "User not found" });
      }

      // If there is existing connection request
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "You have already sent a connection request!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      // Dynamically generate the response message
      let message;
      if (status === "interested") {
        message = `${req.user.firstName} is interested in connecting with ${findToUserId.firstName}.`;
      } else if (status === "rejected") {
        message = `${req.user.firstName} has declined the connection with ${findToUserId.firstName}.`;
      }

      res.status(201).json({
        message: message,
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);
//api TO ACCEPT/ REJECT CONNECTION REQUEST
matchesRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedUser = req.user;
      const { status, requestId } = req.params;
      //validate the status
      const isAllowedStatus = ["accept", "reject"];
      if (!isAllowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId, //this is the _id of user that send the request(like) to user that will accept/reject the request
        toUserId: loggedUser._id, // this is the user that will accept/reject the request
        status: "like", // this is the status of the request that will be accepted/rejected as it is required to be like firstly.
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request not found." });
      }

      connectionRequest.status = status; // update the status of the request

      const data = await connectionRequest.save();
      res.json({
        message: `Connection Request ${status} by ${loggedUser.firstName} `,
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);


module.exports = matchesRouter;
