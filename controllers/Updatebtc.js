const UserSignUp = require("../models/signUp");
const jwt = require("jsonwebtoken");

exports.UpdateBalance = (req, resp, next) => {
  const userId = { _id: req.body.id };
  UserSignUp.findById(userId._id).then((res) => {
    const { balance } = res;
    const {
      status: { deposit },
    } = res;
    const addedBtc = Number(req.body.addedBtc);
    const newBalance = (Number(balance) + addedBtc).toFixed(2);
    const newDeposit = (Number(deposit) + addedBtc).toFixed(2);
    const balcString = newBalance.toString();
    const depositString = newDeposit.toString();
    UserSignUp.findByIdAndUpdate(
      userId,
      { $set: { balance: balcString, "status.deposit": depositString } },
      { useFindAndModify: false },
      (upadateErr, updateRes) => {
        if (upadateErr) {
          resp.status(400).json({
            message: "An error occured updating btc balance",
          });
        } else {
          resp.status(200).json({
            message: "Added to user bitcoin",
          });
        }
      }
    );
  });
};

exports.UpdatePlan = (req, resp, next) => {
  const userId = { _id: req.body.id };
  UserSignUp.findById(userId._id).then((res) => {
    const { plan } = res;
    const newPlan = req.body.newPlan;
    UserSignUp.findByIdAndUpdate(
      userId,
      { $set: { plan: newPlan } },
      { useFindAndModify: false },
      (upadateErr, updateRes) => {
        if (upadateErr) {
          resp.status(400).json({
            message: "An error occured updating user plan",
          });
        } else {
          resp.status(200).json({
            message: "User plan  has been updated",
          });
        }
      }
    );
  });
};

exports.UpdateWithdraw = (req, resp, next) => {
  const userId = { _id: req.body.id };
  UserSignUp.findById(userId._id).then((res) => {
    const { withdraw } = res;
    const withdrawState = !withdraw;
    UserSignUp.findByIdAndUpdate(
      userId,
      { $set: { withdraw: withdrawState } },
      { useFindAndModify: false },
      (upadateErr, updateRes) => {
        if (upadateErr) {
          resp.status(400).json({
            message: "An error occured updating withdraw status",
          });
        } else {
          resp.status(200).json({
            message: "User withdraw status has been updated",
            withdrawStatus: withdrawState,
          });
        }
      }
    );
  });
};
