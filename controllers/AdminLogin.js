const bcrypt = require("bcrypt");
const AdminLogin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

exports.signup = (name, email, pass, btcAddress, ethereumAddress) => {
  bcrypt
    .hash(pass, 10)
    .then((hash) => {
      const user = new AdminLogin({
        name: name,
        email: email,
        password: hash,
        btcAddress: btcAddress,
        ethereumAddress: ethereumAddress,
      });
      user.save();
      console.log(user);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.login = (req, res, next) => {
  AdminLogin.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res.status(400).json({
          message: "email or password is incorrect",
        });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          res.status(401).json({
            message: "Incorrect password try again",
          });
        }
        const token = jwt.sign({ userId: user._id }, "GLOBAL-ASSET-BTC-TOKEN", {
          expiresIn: "24h",
        });
        res.status(200).json({
          message: "Account login was, successful",
          userId: user._id,
          email: user.email,
          token: token,
        });
      });
    })
    .catch((e) => {
      res.status(400).json({
        message: "Email is not registered",
      });
    });
};
