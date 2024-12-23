const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const Usermodel = require('./Models/user')


app.use(express.json());

app.post('/signup' , async (req , res)=>{
  
  console.log(req.body);

  const User = new Usermodel(req.body);
  
try{
  await User.save();
 res.send("User Added Successfully");
}
catch(err)
{
  res.status(400).send("error Occur");
}
 

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

