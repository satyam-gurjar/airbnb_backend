const path = require('path');

//external module
const express = require('express');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb+srv://root:root@airbnb1.2hpergh.mongodb.net/airbnb?retryWrites=true&w=majority";

//local mudule
const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter')
const rootDir = require('./utils/pathUtil');
const errorsControllers = require('./controller/errors');
const { default: mongoose } = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
})

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(session({
  secret:'this is secret txt',
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req,res,next) => {
  req.session.isLoggedIn = req.session.isLoggedIn;
  next();
})

app.use(authRouter);
app.use(storeRouter);
app.use('/host', (req,res,next) => {
  if(req.session.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
});
app.use('/host', hostRouter);
app.use(errorsControllers.pageNotFound);

const PORT = 3000;




mongoose.connect(DB_PATH).then(() => {
  app.listen(PORT, () => {
    console.log("Connect to MongoDB");
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}).catch( err => {
console.log('error while connecting to mongo',err);
});