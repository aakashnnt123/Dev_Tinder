const express = require('express');
const { UserAuth } = require('../middlewares/Userauth');
const UserRouter = express.Router();
const connectionRequestModel = require('../Models/connectionRequest');
const UserModel = require('../Models/user');


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about Skills"
// Get all the pending connection request for the loggedIn user..
UserRouter.get('/user/requests/received'  , UserAuth , async (req , res)=>{
  try{
      const loggedInuser = req.user;

      const connectionRequest = await connectionRequestModel.find({
        toUserId : loggedInuser._id,
        Status : "interested",

      }).populate("fromUserId" ,["firstName" , "lastName" , "photoUrl","about","Skills"]);
      
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

      }).populate("fromUserId" , USER_SAFE_DATA).populate("toUserId");
      
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


// User Feed API...
UserRouter.get('/feed' , UserAuth , async(req , res)=>{
  try{
    const loggedInuser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page-1)*limit;

    const connectionRequest =  await connectionRequestModel.find({
      $or:[
        {fromUserId : loggedInuser._id},
        {toUserId : loggedInuser._id},
      ],
    }).select("fromUserId  toUserId")

    const HideUserFromFeed = new Set();
     connectionRequest.forEach((req) => {
      HideUserFromFeed.add(req.fromUserId.toString());
      HideUserFromFeed.add(req.toUserId.toString());
     });
    
     
     const ShowUsers = await UserModel.find({
      $and: [
        {_id : {$nin: Array.from(HideUserFromFeed)}},
        {_id:{$ne:loggedInuser._id}}
      ],
     }).select(USER_SAFE_DATA).skip(skip).limit(limit)
     res.send(ShowUsers)
  }
  catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
})


module.exports = UserRouter;