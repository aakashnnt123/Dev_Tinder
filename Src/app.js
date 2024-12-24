const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const Usermodel = require('./Models/user')


app.use(express.json());

//insert data
app.post('/signup' , async (req , res)=>{
  
  console.log(req.body);

  const User = new Usermodel(req.body);
  
try{
  await User.save();
 res.send("User Added Successfully");
}
catch(err)
{
  res.status(400).send("error Occur :" + err.message);
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

