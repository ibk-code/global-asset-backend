const UserSignUp = require("../models/signUp");
const AdminSchema = require("../models/adminSchema");

exports.userQuery = (req, res) => {
  UserSignUp.find({}, "_id name userName email withdraw")
    .then((obj) => {
      if (obj === null) {
        res.status(400).json({
          message: "User are empty",
        });
      } else {
        res.status(200).json({
          message: "All user",
          users: obj,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        message: "An error occured",
      });
    });
};

exports.queryAdminAddress = (req, res) => {
  AdminSchema.find(
    { email: "admin@theglobalasset.com" },
    "btcAddress ethereumAddress"
  )
    .then((obj) => {
      if (obj === null) {
        res.status(400).json({
          message: "admin not found",
        });
      } else {
        res.status(200).json({
          message: "Admin Address",
          users: obj,
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        message: "An error occured",
      });
    });
};

exports.singleUser = (req, res) => {
  const userBtcId = req.body.btcId;
  UserSignUp.findOne({ btcId: userBtcId }, "_id name btcId  email")
    .then((obj) => {
      if (obj === null) {
        res.status(400).json({
          message: "User does not exist",
        });
      } else {
        res.status(200).json({
          message: "All user",
          users: [obj],
        });
      }
    })
    .catch((e) => {
      res.status(400).json({
        message: "An error occured",
      });
    });
};
