const mongoose = require('mongoose');

const connectionRequestSchema= new mongoose.Schema({
  fromUserId : {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref : "user"
  },
  toUserId : {
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  Status :{
    type:String,
    enum : {values:["ignore" , "interested","accepted","rejected"],
    message : `Support as a Status`,
    },
    required:true
  }
},
{
  timestamps:true,
}
);

const connectionRequestModel = new mongoose.model("connectionRequestModel",connectionRequestSchema);

module.exports = connectionRequestModel;