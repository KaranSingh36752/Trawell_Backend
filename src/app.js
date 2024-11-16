const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/database");
const User = require("./models/user");
const { validSignUpData } = require("./utilis/validation");
const bcrypt = require("bcrypt");
const userAuth = require("../middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

//Post the data with dynamic nature
app.post("/signup", async (req, res) => {
  // VAlidation of signup user at api level validation
  try {
    validSignUpData(req);
    const { firstName, lastName, age, emailId, gender, image, password } =
      req.body; // Only
    //Encryption of the password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //i=new instance is created to  post the user
    const newUser = new User({
      firstName,
      lastName,
      age,
      emailId,
      gender,
      image,
      password: passwordHash,
    });

    await newUser.save();
    res.send("Data added successfully.");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId) {
      throw new Error("Email not present!!");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials!!");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      //token jwt
      const token = await jwt.sign({ _id: user._id }, "Trawell@123$" , {expiresIn : "0d"});
      console.log(token);
      //Add THE token to the response BACK TO USER
      res.cookie("token", token);
      res.send("Login Successfull.");
    } else {
      throw new Error("Invalid credentials!!");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

//profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    // validate my token
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.post("/sendRequest" , userAuth , async (req , res) => {
  const user = req.user;
  console.log("sendong a connection req");
  res.send(user.firstName + " sent the friend request.");
})



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
  
  // //get api of user by find MOndel
  // app.get("/user", async (req, res) => {
  //   const userEmail = req.body.emailId;
  
  //   try {
  //     const users = await User.find({ emailId: userEmail });
  //     if (users.length === 0) {
  //       res.status(404).send("User not found");
  //     } else {
  //       res.send(users);
  //     }
  //   } catch (err) {
  //     res.status(400).send("something went wrong.");
  //   }
  // });
  // //all database feed api
  // app.get("/feed", async (req, res) => {
  //   try {
  //     const user = await User.find({}); //empty filter is passed
  //     res.send(user);
  //   } catch (err) {
  //     res.status(400).send("something went wrong.");
  //   }
  // });
  // //FindbyID api
  // app.get("/user/id", async (req, res) => {
  //   const userId = req.body._id;
  //   console.log(userId);
  //   try {
  //     // const user = await User.findById({_id : userId}); This is shorthand
  //     const user = await User.findById(userId);
  //     res.send(user);
  //   } catch (err) {
  //     res.status(400).send("something went wrong");
  //   }
  // });
  // //findOne api
  // app.get("/one", async (req, res) => {
  //   const userPassword = req.body.password;
  //   try {
  //     const user = await User.findOne({ password: userPassword });
  //     res.send(user);
  //   } catch (err) {
  //     res.status(400).send("something went wrong");
  //   }
  // });
  // //Patch api
  // app.patch("/user/:userId", async (req, res) => {
  //   const userId = req.params?._id;
  //   const data = req.body;
  
  //   try {
  //     const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender"];
  
  //     const isUpdateAllowed = Object.keys(data).every((k) =>
  //       ALLOWED_UPDATES.includes(k)
  //     );
  
  //     if (!isUpdateAllowed) {
  //       throw new Error("Update not allowed");
  //     }
  //     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
  //       returnDocument: "before",
  //       runValidators: true,
  //     });
  //     // console.log(user);
  //     res.send("data updated successfully");
  //   } catch (err) {
  //     res.status(400).send("something went wrong. ErrorMessage : " + err.message);
  //   }
  // });
  // //Delete api
  // app.delete("/user", async (req, res) => {
  //   const userId = req.body._id;
  //   try {
  //     const user = await User.findByIdAndDelete({ _id: userId });
  //     console.log(user);
  //     res.send("deleted successfully");
  //   } catch (err) {
  //     res.status(400).send("something went wrong");
  //   }
  // });
  // app.post("/user", (req, res) => {
    //   res.send({
      //     name: "John",
//     age: 30,
//     status: "single",
//   });
// });

// app.delete("/user", (req, res) => {
//   res.send("Deleted sucessfully");
// });

// app.put("/user", (req, res) => {
//   res.send({
//     name: "John",
//     age: 30,
//     status: "married",
//   });
// });

// app.patch("/user", (req, res) => {
//   res.send({
//     status: "single",
//   });
// });

// app.use("/",(req,res)=>{
//     res.send("Hello World");
// })

// app.use("/hello",(req,res)=>{
//     res.send("heeloo  heeloejsja");
// })

// app.use("/hello/bitch",(req,res)=>{
//     res.send("Hello bitch");
// })
// app.use("/bitch",(req,res)=>{
//     res.send("STFU and leave");
// })

// },
// (req, res, next) => {
//   console.log("handling the route 2nd");
//  // res.send({ firstName: "Karan", lastName: "Singh", dept_name: "CSE" });
// }

///HOW ROUTE HANDLERS ARE WORKING AND MIDDLEWARES ARE GENERATED WITH THIS FLOW
// app.get(
//   "/user/:userID?/:name?/:password?",
//   (req, res, next) => {
//     const params = req.params;
//     res.send(params);
//     next();
//     console.log("handling the route 1nd");
//     console.log(req.params);
//   }
// );
// app.get(
//     "/user/:userID?/:name?/:password?",
//     (req, res, next) => {
//       const params = req.params;
//     //   res.send(params);
//     //   console.log("handling the route 2nd");
//     //   console.log(req.params);
//     next();
//     }
//   );

// const {isAdminAuth,isUserAuth} = require("../middlewares/auth");
// app.use("/admin", isAdminAuth);
// //So to handle the auth middlewares are used such that the repettion of code is not done again and again...
// app.get("/user/getdata",isUserAuth, (req, res) => {
//     throw new Error("dfdsad");
//     res.send("user data found");

//   });

// app.get("/admin/getdata", (req, res) => {
//     res.send("admin data found");
// });
// app.get("/admin/deletedata", (req, res) => {
//   res.send("admin data deleted");
// });

// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong")
//     }

// })
