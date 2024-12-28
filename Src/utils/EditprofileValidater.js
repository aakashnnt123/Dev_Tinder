const validator = require("validator");

const EditprofileValidater=(req)=>{
   const AllowedEditField =["firstName"," lastName","emailId","age" ,"gender" , "photoUrl","about","Skills"];

  const isEditAllowed = Object.keys(req.body).every(field => AllowedEditField.includes(field));

  return isEditAllowed;
}

module.exports = EditprofileValidater;