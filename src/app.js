const express = require("express");
const connectDB = require("../config/database")
const app = express();
connectDB().then(()=>{
    console.log("Connected to MongoDB database")
    app.listen(7777, () => {
  console.log("server is running on port 7777");
});
}).catch((err)=>{
    console.log("Database can't connected")
})


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