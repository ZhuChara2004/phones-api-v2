const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./src/config/constants');
const usersRouter = require('./src/routes/usersRouter');
const phonesRouter = require('./src/routes/phonesRouter');
const ordersRouter = require('./src/routes/ordersRouter');

const DB_ADDRESS = process.env.DATABASE_URL || config.DB_ADDRESS;

mongoose.connect(DB_ADDRESS);
const db = mongoose.connection;

db.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  // eslint-disable-next-line no-console
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
  // eslint-disable-next-line no-console
  console.log('app running on port', server.address().port);
});
