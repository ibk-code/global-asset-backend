const AdminQuery = require("../models/adminSchema");

exports.queryAdminWallet = (req, res, next) => {
  AdminQuery.findOne({ email: "admin@theglobalasset.com" }, (err, user) => {
    if (user === null) {
      res.status(400).json({
        message: "This user does not exist",
      });
      return;
    } else {
      res.status(200).json({
        adminWallet: user.walletAddress,
      });
    }
  });
};

exports.updateAdminWallet = (req, res, next) => {
  AdminQuery.findOne({ email: "admin@theglobalasset.com" }, (err, user) => {
    if (user === null) {
      res.status(400).json({
        message: "This user does not exist",
      });
      return;
    } else {
      AdminQuery.findOneAndUpdate(
        { email: "admin@theglobalasset.com" },
        { [req.body.type]: req.body.newAddress },
        { useFindAndModify: false, new: true },
        (err, resp) => {
          if (err) {
            res.status(400).json({
              message: "An error occured when setting password",
            });
          } else {
            res.status(200).json({
              message: "walletAddress is updated successfully",
              btcAddress: resp.btcAddress,
              ethereumAddress: resp.ethereumAddress,
            });
          }
        }
      );
    }
  });
};

exports.changeWithdraw = (req, res, next) => {
  AdminQuery.findOne({ email: "admin@theglobalasset.com" }, (err, user) => {
    if (user === null) {
      res.status(400).json({
        message: "This user does not exist",
      });
      return;
    } else {
      if (user.withdrawStatus) {
        AdminQuery.findOneAndUpdate(
          { email: "admin@theglobalasset.com" },
          { withdrawStatus: false },
          { useFindAndModify: false, new: true },
          (err, resp) => {
            if (err) {
              res.status(400).json({
                message: "An error occured when changing withdraw status",
              });
            } else {
              res.status(200).json({
                message: "withdraw status changed",
                withdrawStatus: resp.withdrawStatus,
              });
            }
          }
        );
      } else {
        AdminQuery.findOneAndUpdate(
          { email: "admin@theglobalasset.com" },
          { withdrawStatus: true },
          { useFindAndModify: false, new: true },
          (err, resp) => {
            if (err) {
              res.status(400).json({
                message: "An error occured when changing withdraw status",
              });
            } else {
              res.status(200).json({
                message: "withdraw status changed",
                withdrawStatus: resp.withdrawStatus,
              });
            }
          }
        );
      }
    }
  });
};

exports.queryWithdraw = (req, res, next) => {
  AdminQuery.findOne({ email: "admin@theglobalasset.com" }, (err, user) => {
    if (user === null) {
      res.status(400).json({
        message: "This user does not exist",
      });
      return;
    } else {
      res.status(200).json({
        withdrawStatus: user.withdrawStatus,
      });
    }
  });
};
