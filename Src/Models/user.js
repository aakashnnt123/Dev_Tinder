const mongoose= require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName : {
    type : String
  },
  lastName : {
    type : String
  },
  emailId : {
    type : String
  },
  password : {
    type : String
  },
  age : {
    type : Number
  },
  gender : {
    type : String
  }
});

const Model = mongoose.model("User" , UserSchema);

module.exports = Model;