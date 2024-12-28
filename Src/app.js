const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const cookieParser = require('cookie-parser');

const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/Profile");
const requestRouter = require("./Routes/Request");

app.use(express.json());
app.use(cookieParser());

app.use('/' , authRouter);
app.use('/' , profileRouter);
app.use('/' , requestRouter);



//Update API...
// app.patch("/user" , async (req,res)=>{
//   const userId = req.body.userId;
//    const data = req.body;
// try{

//     const Allowed_Update = ["userId","photoUrl" ,"about","Skills"];


//     const IsUpdateAllowed = Object.keys(data).every((k)=> Allowed_Update.includes(k)
//   );

//   if(!IsUpdateAllowed){
//     throw new Error("Update not allowed");
//     ;
//   }

//         await Usermodel.findByIdAndUpdate({_id : userId},data,{
//           returnDocument:"after" , runValidators: true
//         });
//          res.send("User Data Update")
//      }
//    catch(err)
//    {
//     res.status(400).send("error Occur :" + err.message);
//    }
  
// })




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

