const express = require('express');
const Usermodel = require('../Models/user');
const {UserAuth} = require('../middlewares/Userauth');

const profileRouter = express.Router();

// get profile.
profileRouter.get('/profile' ,  UserAuth ,async (req,res)=>{
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

module.exports = profileRouter;