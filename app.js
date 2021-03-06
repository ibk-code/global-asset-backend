const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();
let backup = require("./backup");

const app = express();

const userRoutes = require("./routes/user");
const cronIncrementFunc = require("./controllers/percentIncrease");
const adminCreation = require("./controllers/AdminLogin");
const adminQuery = require("./routes/adminRoutes");
const userWithdraw = require("./routes/withdraw");
const userDeposit = require("./routes/deposit");
const userContact = require("./routes/contact");

app.use(bodyParser.json());

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch(() => {
    console.log("Connection to server failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

cron.schedule("7 10 * * *", () => {
  console.log("i ran");
  cronIncrementFunc.beginnerPlan();
});

cron.schedule("0 10 * * *", () => {
  cronIncrementFunc.intermediatePlan;
});

cron.schedule("0 10 * * *", () => {
  cronIncrementFunc.advancePlan();
});

cron.schedule("0 10 * * *", () => {
  cronIncrementFunc.proPlan();
});

cron.schedule("0 0 * * *", () => {
  console.log("i ran backup");
  backup.backUp();
});

// adminCreation.signup(
//   "Chigozie Godwin",
//   "admin@theglobalasset.com",
//   "globalasset@2020",
//   "63dhguy38873983",
//   "7278387guuwy828",
//   "weiodhsj30304509"
// );

app.use("/api/auth", userRoutes);
// app.use('/api/update', userUpdate);
app.use("/api/user", userWithdraw);
app.use("/api/user", userDeposit);
app.use("/api/user", userContact);
app.use("/api/admin", adminQuery);

module.exports = app;
