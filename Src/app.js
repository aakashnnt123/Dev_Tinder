const express = require('express');

const app = express();


app.use("/user" , (req,res)=>{
  res.send("USE CAll");
})

app.get("/user" , (req,res)=>{
  res.send({firstname : "Aakash" , lastname : "Sharma"});
});

app.post("/user" , (req,res)=>{
  console.log("Save Data to the database")
  res.send("data successfully saved to the database");
});

app.delete("/user" , (req,res)=>{
  console.log("delete Data from the database")
  res.send("data successfully delete from the database");
})

app.use('/test' , (req,res)=>{
  res.send("Hello from the Server!");
});




PORT = 3000;
app.listen(PORT , () =>{
  console.log(`Server Run on http://localhost:${PORT}`)
});