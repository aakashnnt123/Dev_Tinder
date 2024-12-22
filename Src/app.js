const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const Usermodel = require('./Models/user')

app.post('/signup' , async (req , res)=>{
  const User = new Usermodel( {
    firstName : "Aakash",
    lastName : "Sharma",
    emailId : "aakashsh205@gmail.com",
    password : "aakash@123"
}
)
  

 await User.save();
  
 res.send("User Added Successfully");

})





connectDB().then(()=>{
  console.log("Database connection establised...");
  PORT = 3000;
   app.listen(PORT , () =>{
  console.log(`Server Run on http://localhost:${PORT}`);
});
  })
.catch((err)=>{
  console.log("Database connot be connected")
});

