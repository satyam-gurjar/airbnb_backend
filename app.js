//Core module
const path = require('path');

//External Module
const express = require('express');

// local module
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsControllers = require('./controller/errors')


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,'public')));

app.use(errorsControllers.pageNotFound);



const PORT = 3000;
app.listen(PORT,()=>{
  console.log(`Server is running http://127.0.0.1:${PORT}`);
})