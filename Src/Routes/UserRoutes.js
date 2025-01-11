const express = require('express');
const { UserAuth } = require('../middlewares/Userauth');
const UserRouter = express.Router();
const connectionRequestModel = require('../Models/connectionRequest');

// Get all the pending connection request for the loggedIn user..
UserRouter.get('/user/requests/received'  , UserAuth , async (req , res)=>{
  try{
      const loggedInuser = req.user;

      const connectionRequest = await connectionRequestModel.find({
        toUserId : loggedInuser._id,
        Status : "interested",

      }).populate("fromUserId" ,["firstName" , "lastName"]);
      
      res.json({message : "Data fetchsuccessfully" ,data : connectionRequest});
  }
  catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
});

// User Connections API..
UserRouter.get('/user/connections'  , UserAuth , async (req , res)=>{
  try{
      const loggedInuser = req.user;

      const connectionRequest = await connectionRequestModel.find({
        $or :[
        {toUserId : loggedInuser._id,
          Status : "accepted",},
          {fromUserId : loggedInuser._id,
            Status : "accepted",}
        ]

      }).populate("fromUserId" ,["firstName" , "lastName"]).populate("toUserId");
      
      const data = connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInuser._id.toString())
        {
          row.toUserId
        }
        return row.fromUserId
      }
      );

      res.json({data });
  }
  catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
});



module.exports = UserRouter;