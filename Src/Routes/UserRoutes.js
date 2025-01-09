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

      });
      res.json({message : "Data fetchsuccessfully" ,data : connectionRequest});
  }
  catch (err) {
    res.status(400).send('ERROR: ' + err.message);
  }
});


module.exports = UserRouter;