const express = require('express');
const bodyParser =  require('body-parser')
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config()

const app = express();

const userRoutes = require('./routes/user');
const userUpdate = require('./routes/userAdmin');
const cronIncrementFunc = require('./controllers/percentIncrease');
const adminCreation = require('./controllers/AdminLogin')
const userWithdraw = require('./routes/withdraw');
const userContact = require('./routes/contact');

app.use(bodyParser.json());

mongoose.connect(
   process.env.CONNECTION_STRING
  , {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch(() => {
    console.log("Connection to server failed");
  });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  cron.schedule("0 12 * * *", () => {
    console.log("i ran")
    cronIncrementFunc.dayPlan();
  })

  // adminCreation.signup('John Doe', 'john@globalassets.com', 'globalassets@2020')

  // cron.schedule("* 1 * * * *", () => {
  //   console.log("i ran")
  //   cronIncrementFunc.threeDaysPlan();
  // })

  // cron.schedule("* 1 * * * *", () => {
  //   console.log("i ran")
  //   cronIncrementFunc.goldPlan();
  // })

  // cron.schedule("* 1 * * * *", () => {
  //   console.log("i ran")
  //   cronIncrementFunc.traderPlan();
  // })


  app.use('/api/auth', userRoutes);
  app.use('/api/update', userUpdate);
  app.use('/api/user', userWithdraw);
  app.use('/api/user', userContact);


  module.exports = app;