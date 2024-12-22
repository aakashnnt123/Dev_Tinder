const mongoose = require('mongoose');

const connectDB = async ()=>{
   await mongoose.connect(
  "mongodb+srv://Aakashup11:247452@learnnode.5lffo.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=LearnNode"
    
    );
};

module.exports = connectDB;


