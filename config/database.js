const mongoose = require("mongoose");

const connectDB = async() => {
    mongoose.connect(
        "mongodb+srv://karansingh36752:dw0nWOUqPSk9n8aJ@nodejsnamaste.xfmxb.mongodb.net/Trawell"
    )
}

module.exports = connectDB;
