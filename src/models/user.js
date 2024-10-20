const mongoose = require("mongoose");
const validator = require("validator"); // Ensure validator is imported

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 40,
      trim: true, // Removes any extra spaces
    },
    lastName: {
      type: String,
      default: "", // If not required, can give default empty string
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message: "Password should be strong (min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol)",
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      validate: {
        validator: (value) => ["male", "female", "others"].includes(value.toLowerCase()),
        message: "Gender is not valid.",
      },
    },
    image: {
      type: String,
      default: "https://www.iibsonline.com/public/testimonial/testimonial_image_full/183.png",
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid image URL",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
