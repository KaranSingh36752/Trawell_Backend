const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const matchesRouter = express.Router();

// matchesRouter.post(
//   "/request/send/:status/:toUserId",
//   userAuth,
//   async (req, res) => {
//     try {
//       const fromUserId = req.user._id;
//       const toUserId = req.params.toUserId;
//       const status = req.params.status;

//       const allowedStatus = ["interested", "rejected"];
//       if (!allowedStatus.includes(status)) {
//         throw new Error("Invalid status");
//       }

//       //check the User even present
//       const findToUserId = await User.findById(toUserId);
//       if (!findToUserId) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // If there is existing connection request
//       const existingRequest = await ConnectionRequest.findOne({
//         $or: [
//           {
//             fromUserId,
//             toUserId,
//           },
//           {
//             fromUserId: toUserId,
//             toUserId: fromUserId,
//           },
//         ],
//       });
//       if (existingRequest) {
//         return res
//           .status(400)
//           .json({ message: "You have already sent a connection request!!" });
//       }

//       const connectionRequest = new ConnectionRequest({
//         fromUserId,
//         toUserId,
//         status,
//       });
//       const data = await connectionRequest.save();

//       // Dynamically generate the response message
//       let message;
//       if (status === "interested") {
//         message = `${req.user.firstName} is interested in connecting with ${findToUserId.firstName}.`;
//       } else if (status === "rejected") {
//         message = `${req.user.firstName} has declined the connection with ${findToUserId.firstName}.`;
//       }

//       res.status(201).json({
//         message: message,
//         data: data,
//       });
//     } catch (err) {
//       res.status(400).send("ERROR : " + err.message);
//     }
//   }
// );

module.exports = matchesRouter;
