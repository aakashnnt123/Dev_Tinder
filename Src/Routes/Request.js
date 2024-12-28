const express = require('express');
const Usermodel = require('../Models/user');
const {UserAuth} = require('../middlewares/Userauth');

const requestRouter = express.Router();

// send connection request...
requestRouter.post('/sendConnectionRequest' , UserAuth , (req , res)=>{
  const user = req.user;
  
  console.log("sending a connection request by : " ,user.firstName+user.lastName);
  res.send("Connection Request Send Successfully..");
})

module.exports = requestRouter;