const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./src/config/constants');
const usersRouter = require('./src/routes/usersRouter');
const phonesRouter = require('./src/routes/phonesRouter');
const ordersRouter = require('./src/routes/ordersRouter');

mongoose.connect(config.DB_ADDRESS);
const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/phones', phonesRouter);
app.use('/orders', ordersRouter);

const server = app.listen(config.PORT || 3000, () => {
  console.log("app running on port", server.address().port);
});
