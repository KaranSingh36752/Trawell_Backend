const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const matchesRouter = require("./routes/matches")

app.use("/" , authRouter);
app.use("/" , userRouter);
app.use("/" , matchesRouter);

connectDB()
.then(() => {
  console.log("Connected to MongoDB database");
  app.listen(7777, () => {
    console.log("server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database can't connected");
  });
  
  
