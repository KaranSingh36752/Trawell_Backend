const express = require("express");

const app = express();




app.use("/hello",(req,res)=>{
    res.send("heeloo  heeloejsja");
})

app.use("/hello/bitch",(req,res)=>{
    res.send("Hello bitch");
})
app.use("/bitch",(req,res)=>{
    res.send("STFU and leave");
})
app.use("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(7777,()=>{
    console.log("server is running on port 7777");
})