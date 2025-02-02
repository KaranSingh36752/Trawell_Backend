const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated. Please login first." });
    }
    const decodeData = await jwt.verify(token, "Trawell@123$");//it will be in .process.env file
    const {_id} = decodeData;
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};
module.exports = {userAuth};
