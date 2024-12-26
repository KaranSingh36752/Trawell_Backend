const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const matchesRouter = require("./routes/matches")
const groupRouter = require("./routes/groups");

app.use("/" , authRouter);
app.use("/" , userRouter);
app.use("/" , matchesRouter);
app.use("/" , groupRouter);

connectDB()
.then(() => {
  console.log("Connected to MongoDB database");
  app.listen(7777, () => {
    console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err.message);
  });
  
  
