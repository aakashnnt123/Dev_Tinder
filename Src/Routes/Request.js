const express = require('express');
const Usermodel = require('../Models/user');
const {UserAuth} = require('../middlewares/Userauth');
const connectionRequestModel = require('../Models/connectionRequest');

const requestRouter = express.Router();

// send connection request...
requestRouter.post('/request/send/:status/:toUserId' , UserAuth , async (req , res)=>{
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
  const Status = req.params.status;

  if(fromUserId == toUserId){
    throw new Error("Invalid Request!")
  }
   const isAllowedstatus = ["ignores" , "interested"];
   if(!isAllowedstatus.includes(Status))
   {
      throw new Error("Invalid status types");
   }

   const toUser = await Usermodel.findById(toUserId);
   
   if(!toUser)
   {
    throw new Error("User not Found")
   }

  //  IF there is an existing Connection Request 

  const existingConnectionRequest = await  connectionRequestModel.findOne({$or : [
    {fromUserId , toUserId},
    {fromUserId : toUserId , toUserId:fromUserId},
  ],
  });

  if(existingConnectionRequest){
    throw new Error("Connection already exist");
  }

    const connectionRequest = new connectionRequestModel({
      fromUserId,
      toUserId,
      Status
    })

     const data=await connectionRequest.save();

     res.json({
      message:req.user.firstName+" is "+Status+" in "+toUser.firstName ,
      data
     })
  }
  catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
  
})

module.exports = requestRouter;