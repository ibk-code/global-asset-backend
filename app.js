const express = require('express');
const bodyParser =  require('body-parser')
const mongoose = require('mongoose')

const app = express();

const userRoutes = require('./routes/user')

app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://helloibk:global-asset@2020@cluster0-gkt8h.mongodb.net/test?retryWrites=true&w=majority"
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


  app.use('/api/auth', userRoutes)


  module.exports = app;