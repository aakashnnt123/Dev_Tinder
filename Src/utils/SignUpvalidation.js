const validator = require("validator");

const validateSignupData = (req)=>{
       const {firstName , lastName , emailId , password} = req.body; 

       if(!firstName || !lastName){
         throw new Error("Firstname or Lastname Missing");
       }
       
       else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!");
       }

       else if(!validator.isStrongPassword(password)){
          throw new Error("plz enter a strong password");
       }
  };

  module.exports = {validateSignupData ,};