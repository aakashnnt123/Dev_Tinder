const mongoose= require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true,
    minlength : 4,
    maxlenght : 50
  },
  lastName : {
    type : String
  },
  emailId : {
    type : String,
    required : true,
    trim : true
  },
  password : {
    type : String,
    required : true,
    lowercase : true,
    unique : true,
    trim : true
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
    default : "https://www.aquasafemine.com/wp-content/uploads/2018/06/dummy-man-570x570.png"
  },
  about :{
    type : String,
    default : "This is a default about of the user",
  },
  Skills :{
    type : [String]
  }
},
{
timestamps : true

});

const Model = mongoose.model("User" , UserSchema);

module.exports = Model;