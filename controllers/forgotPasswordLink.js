const UserSignUp = require("../models/signUp");
const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "admin@theglobalasset.com",
    pass: "Globalasset@2020",
  },
});

exports.passwordLink = (req, res) => {
  UserSignUp.findOne({ email: req.body.email }, (err, user) => {
    console.log(req.body.email);
    console.log(user);
    if (user === null) {
      res.status(400).json({
        message: "This email is not registered",
      });
      return;
    }else{
      const mailOptions = {
        from: '"theglobalasset" admin@theglobalasset.com',
        to: `${req.body.email}`,
        subject: "Change Password",
        html: `click the link to reset your password<a href="http://localhost:3000/forgot?user=${user._id}"> reset password</a>`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
          res.status(200).json({
            message: "Your information was successfully submited",
          });
        }
      });
    }
  });
};
