const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength : 4,
      maxLength : 40,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min:18,
    },
    gender: {
      type: String,
      required: true,
      validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error ("Gender Is not Valid.")
        }
      }
    },
    image: {
      type: String,
      // required:true,
      default:
        "https://www.iibsonline.com/public/testimonial/testimonial_image_full/183.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
