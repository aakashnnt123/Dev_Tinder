const express = require('express');
const Usermodel = require('../Models/user');
const {UserAuth} = require('../middlewares/Userauth');
const EditprofileValidater = require("../utils/EditprofileValidater");

const profileRouter = express.Router();

// get profile.
profileRouter.get('/profile/view' ,  UserAuth ,async (req,res)=>{
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

//edit profile

profileRouter.patch('/profile/edit' , UserAuth ,  async (req,res)=>{
  try{
    if(!EditprofileValidater(req)){
      throw new Error("Invalid Edit Request!")
    }

    const Loggeduser = req.user;
    
    Object.keys(req.body).forEach(key => (Loggeduser[key] = req.body[key]));

    await Loggeduser.save();
    
    res.send(`${Loggeduser.firstName}, your Profile Updated Successfully`);

  }
  catch(err)
  {
    res.status(400).send("ERROR : "+ err.message);
  }
})

module.exports = profileRouter;