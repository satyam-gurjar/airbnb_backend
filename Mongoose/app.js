const path = require('path');
const express = require('express');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsControllers = require('./controller/errors');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(storeRouter);
app.use('/host', hostRouter);
app.use(errorsControllers.pageNotFound);

const PORT = 3000;

const DB_PATH = "mongodb+srv://root:root@airbnb1.2hpergh.mongodb.net/airbnb?retryWrites=true&w=majority";
mongoose.connect(DB_PATH).then(() => {
  app.listen(PORT, () => {
    console.log("Connect to MongoDB");
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}).catch( err => {
console.log('error while connecting to mongo',err);
});