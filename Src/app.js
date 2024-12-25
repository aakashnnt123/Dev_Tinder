const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const Usermodel = require('./Models/user');
const{validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');

app.use(express.json());

// Login API...

app.post('/login' , async (req , res)=>{
  try{
      const{emailId, password} = req.body;
      

       const user = await Usermodel.findOne({emailId : emailId});
        if(!user)
        {
          throw new Error("Invalid Credentials");
        }

       const ispassword = await bcrypt.compare(password , user.password);

       if(ispassword){
        res.send("Login Successfully");
       }

       else{
        throw new Error("password is not correct");
       }
}
  catch(err)
  {
      res.status(400).send("Error :" + err.message);
  }
});

//insert data
app.post('/signup' , async (req , res)=>{
  
  // console.log(req.body);
try{

  const {firstName , lastName , emailId , password} = req.body; 

  validateSignupData(req);

  const passwordHash = await bcrypt.hash(password, 10);
  // console.log(passwordHash);


  const User = new Usermodel({
    firstName,
    lastName,
    emailId,
    password : passwordHash,
  });
  
  await User.save();
 res.send("User Added Successfully");
}
catch(err)
{
  res.status(400).send("ERROR :" + err.message);
}
 })


// get user by email..
app.get("/user" , async (req , res)=>{
   const useremail = req.body.emailId;
   try{
    const users = await Usermodel.findOne({emailId : useremail});
    res.send(users)
  }
  //  try{
  //   const user = await Usermodel.find({emailId : useremail});
  //   res.send(user);
  //  }
   catch(err)
   {
    res.status(400).send("error Occur :" + err.message);
   }
   
})

//get all the user back..
app.get("/feed" , async (req , res)=>{
  try{
    const users = await Usermodel.find({});
    res.send(users)
  }
  catch(err)
   {
    res.status(400).send("error Occur :" + err.message);
   }
})

//detete API...

app.delete("/user" , async(req,res)=>{
  const userId = req.body.userId;
  try{
      const user = await Usermodel.findByIdAndDelete({_id : userId});
      res.send("User deleted Succeccfully");
  }
  catch(err)
   {
    res.status(400).send("error Occur :" + err.message);
   }
})

//Update API...
app.patch("/user" , async (req,res)=>{
  const userId = req.body.userId;
   const data = req.body;

   


   try{

    const Allowed_Update = ["userId","photoUrl" ,"about","Skills"];


    const IsUpdateAllowed = Object.keys(data).every((k)=> Allowed_Update.includes(k)
  );

  if(!IsUpdateAllowed){
    throw new Error("Update not allowed");
    ;
  }

        await Usermodel.findByIdAndUpdate({_id : userId},data,{
          returnDocument:"after" , runValidators: true
        });
         res.send("User Data Update")
     }
   catch(err)
   {
    res.status(400).send("error Occur :" + err.message);
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

