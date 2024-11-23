const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type. `,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save" , function(){
  const connectionRequest = this;
  if(connectionRequest.toUserId.equals(connectionRequest.fromUserId)){
    throw new Error("You can't send a connection request to yourself");
  }
})

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
); //it should be in capitalized letters

module.exports = ConnectionRequestModel;
