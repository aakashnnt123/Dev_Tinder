const express = require('express');
const connectDB = require("./Config/Database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/Profile");
const requestRouter = require("./Routes/Request");
const UserRouter = require("./Routes/UserRoutes")

app.use(express.json());
app.use(cookieParser());
app.use(cors()); 


app.use('/' , authRouter);
app.use('/' , profileRouter);
app.use('/' , requestRouter);
app.use('/' , UserRouter);



connectDB().then(()=>{
  console.log("Database connection establised...");
  PORT = 3000;
   app.listen(PORT , () =>{
  console.log(`Server Run on http://localhost:${PORT}`);
});
  })
.catch((err)=>{
  console.log("Database connot be connected")
});

