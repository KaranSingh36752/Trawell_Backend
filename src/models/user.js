const mongoose = require("mongoose");
const validator = require("validator"); // Ensure validator is imported
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        message:
          "Password should be strong (min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol)",
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
        validator: (value) =>
          ["male", "female", "others"].includes(value.toLowerCase()),
        message: "Gender is not valid.",
      },
    },
    image: {
      type: String,
      default:
        "https://www.iibsonline.com/public/testimonial/testimonial_image_full/183.png",
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid image URL",
      },
    },
    about : {
      type: String,
      maxLength : 300,
    }
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
  }
  next(); // Indicate that the middleware is done
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Trawell@123$", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser){
  const user = this;
  const passwordHash = user.password;

  const isValid = await bcrypt.compare(passwordByUser, passwordHash);
  return isValid;
}

module.exports = mongoose.model("User", userSchema);
