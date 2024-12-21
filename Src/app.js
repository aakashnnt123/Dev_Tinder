const express = require('express');

const app = express();



PORT = 3000;
app.listen(PORT , () =>{
  console.log(`Server Run on http://localhost:${PORT}`)
});