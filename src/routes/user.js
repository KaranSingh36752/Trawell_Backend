const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const { validUpdateData } = require("../utilis/validation.js");
const userRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const USER_SAVE_DATA = ["firstName", "lastName", "age", "gender", "image"];

// userRouter.get("/user/feed", userAuth, async (req, res) => {
//   try {
//     // Get the logged-in user from the request
//     const loggedUser = req.user;

//     // Step 1: Find all connection requests involving the logged-in user
//     const userConnections = await ConnectionRequest.find({
//       $or: [
//         { toUserId: loggedUser._id, status: { $in: ["accept", "like", "reject", "pass"] } },
//         { fromUserId: loggedUser._id, status: { $in: ["accept", "like", "reject", "pass"] } },
//       ],
//     });

//     // Step 2: Create an array of user IDs that the logged-in user is connected to
//     const connectedUserIds = userConnections.map((connection) => {
//       // Check if the logged-in user is the 'fromUserId'
//       return connection.fromUserId.toString() === loggedUser._id.toString()
//         ? connection.toUserId  // If so, return the 'toUserId'
//         : connection.fromUserId; // Otherwise, return the 'fromUserId'
//     });

//     // Step 3: Build the feed by excluding the logged-in user and the users they are connected to
//     const feed = await User.find({
//       _id: {
//         // Use $nin to exclude the logged-in user and the connected users from the feed
//         $nin: [
//           loggedUser._id,          // Exclude the logged-in user
//           ...connectedUserIds      // Exclude all users in the connectedUserIds array using the spread operator
//         ]
//       }
//     });

//     // Step 4: Send the filtered user feed as a response
//     res.json({
//       message: "User Feed",
//       feed: feed  // Send the filtered feed of users
//     });

//   } catch (err) {
//     // Handle errors and send an error message
//     res.status(400).send("ERROR :" + err.message);
//   }
// });

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    console.log(hideUserFromFeed);

    const feed = await User.find({
      $and: [
        { _id: { $ne: loggedUser._id } },
        { _id: { $nin: Array.from(hideUserFromFeed) } },
      ],
    })
      .select(USER_SAVE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(feed);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

userRouter.get("/user/connections/pending", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedUser,
      status: "like",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "All pending connections",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedUser, status: "accept" },
        { toUserId: loggedUser, status: "accept" },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);

    //idr hain ik confusion that connection request of loggedin user is also getting displayed

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == loggedUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      data,
    });
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
      user: loggedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = userRouter;
