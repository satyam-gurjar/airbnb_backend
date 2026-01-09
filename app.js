const express = require('express');

// local module
const userRouter = require('./routes/userRouter')
const hostRouter = require('./routes/hostRouter')



const app = express();


app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);


app.use((req,res,next) => {

  res.status(404).send(`<h1 style="display:flex,; justify-content:center; align-items:center;"> 404 Your page not found on airbnb</h1>
    `)
})



const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`Server is running http://127.0.0.1:${PORT}`);
})