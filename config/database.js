const mongoose = require("mongoose");

const connectDB = async() => {
    mongoose.connect(
        "mongodb+srv://karansingh36752:FUtTnQBSdT12djOJ@nodejsnamaste.xfmxb.mongodb.net/Trawell"
    )
}

module.exports = connectDB;

