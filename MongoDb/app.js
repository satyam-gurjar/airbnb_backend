const path = require('path');
const express = require('express');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const errorsControllers = require('./controller/errors');
const { mongoConnect } = require('./utils/Databaseutil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(storeRouter);
app.use('/host', hostRouter);
app.use(errorsControllers.pageNotFound);

const PORT = 3000;

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
});
