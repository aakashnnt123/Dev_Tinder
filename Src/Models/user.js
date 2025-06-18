const mongoose= require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true,
    minlength : 3,
    maxlenght : 50
  },
  lastName : {
    type : String,
    required : true
  },
  
  emailId : {
    type : String,
    required : true,
    trim : true,
    unique : true,
    validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email address :"+ value);
        }
    }
  },
  password : {
    type : String,
    required : true,
    trim : true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Weak Password :"+ value);
      }
  }
  },
  age : {
    type : Number,
    min : 18
  },
  gender : {
    type : String,
    validate(value){
      if(!["male" ,"female" , "other"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  photoUrl :{
    type : String,
    default : "https://commutiny.in/sites/default/files/default_images/user.png",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid Photo URL  :"+ value);
      }
  }
  },
  about :{
    type : String,
    default : "This is a default about of the user",
    minlength : 3,
    maxlenght : 20
  },
  Skills: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length <= 5;
      },
      message: 'You can add up to 5 skills only.'
    }
  }
},
{
timestamps : true

});

const Model = mongoose.model("User" , UserSchema);

module.exports = Model;