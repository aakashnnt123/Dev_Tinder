const express = require('express');

const app = express();

app.use('/test' , (req,res)=>{
  res.send("Hello from the Server!");
})

app.use('/hello' , (req,res)=>{
  res.send("Hello! Hello! Hello!");
})

app.use('/' , (req,res)=>{
  res.send("Welcome to server!");
})

PORT = 3000;
app.listen(PORT , () =>{
  console.log(`Server Run on http://localhost:${PORT}`)
});