const express = require('express');

const app = express();


app.use("/user" ,(req,res,next)=>{
  res.send("Route handler 1");
  console.log("Request receive user 1");
  next();
}, (req,res,next)=>{
  res.send("Route handler 2");
  console.log("Request receive user 2");
  next();
}, (req,res,next)=>{
  res.send("Route handler 3");
  console.log("Request receive user 3");
  next();
} , (req,res,next)=>{
    res.send("Route handler 4");
    console.log("Request receive user 4");
    // next();
})





PORT = 3000;
app.listen(PORT , () =>{
  console.log(`Server Run on http://localhost:${PORT}`)
});