const UserSignUp = require("../models/signUp");
const nodeMailer = require("nodemailer");

exports.deposit = (req, res, next) => {
  const userId = req.body.id;
  console.log(userId);
  UserSignUp.findById(userId)
    .then((obj) => {
      let transporter = nodeMailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        auth: {
          user: "admin@theglobalasset.com",
          pass: "Globalasset@2020",
        },
      });

      const planStatus = obj.plan !== " " ? obj.plan : "no plan";

      const mailOptions = {
        from: '"theglobalasset" admin@theglobalasset.com',
        to: "admin@theglobalasset.com",
        subject: "Deposit Message",
        text: `Deposit process of $${req.body.amount} from user ${obj.name} with ${obj._id} with email address of ${obj.email} from wallet address of ${req.body.address} and set plan is ${req.body.plan}, with ${planStatus}  `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({
            message: "Deposit request initiated",
          });
        }
      });
    })
    .catch((e) => {
      res.status(400).json({
        message: "User not found",
      });
    });
};
