const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const Usermodel = require('./Models/user');
const{validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const Jwt = require('jsonwebtoken');
const {UserAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());


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

       if(ispassword)
        {

          const token = await Jwt.sign({_id : user._id},"DEV@tinder@123",{expiresIn :"1d"});
        
        res.cookie("token" , token);
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

// get profile.
app.get('/profile' ,  UserAuth ,async (req,res)=>{
  try{
   
   const user = req.user;
   

  if(!user){
    throw new Error("User Does not exist");
  }
  res.send(user);
  }
  catch(err)
  {
      res.status(400).send("Error :" + err.message);
  } 
  
})

//SignUp
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

// send connection request...
app.post('/sendConnectionRequest' , UserAuth , (req , res)=>{
    const user = req.user;
    
    console.log("sending a connection request by : " ,user.firstName+user.lastName);
    res.send("Connection Request Send Successfully..");
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

