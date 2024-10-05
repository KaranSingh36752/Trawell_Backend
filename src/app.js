const express = require("express");

const app = express();

app.get("/user/:userID?/:name?/:password?", (req, res) => {
    console.log(req.params)
  res.send({ firstName: "Karan", lastName: "Singh", dept_name: "CSE" });
});

app.post("/user", (req, res) => {
  res.send({
    name: "John",
    age: 30,
    status: "single",
  });
});

app.delete("/user", (req, res) => {
  res.send("Deleted sucessfully");
});

app.put("/user", (req, res) => {
  res.send({
    name: "John",
    age: 30,
    status: "married",
  });
});

app.patch("/user", (req, res) => {
  res.send({
    status: "single",
  });
});

// app.use("/",(req,res)=>{
//     res.send("Hello World");
// })

app.listen(7777, () => {
  console.log("server is running on port 7777");
});

// app.use("/hello",(req,res)=>{
//     res.send("heeloo  heeloejsja");
// })

// app.use("/hello/bitch",(req,res)=>{
//     res.send("Hello bitch");
// })
// app.use("/bitch",(req,res)=>{
//     res.send("STFU and leave");
// })
