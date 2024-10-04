const express = require("express");

const app = express();

app.use((req,res)=>{
    res.send("Hello World");
})

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})