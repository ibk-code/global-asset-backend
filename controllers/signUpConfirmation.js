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

exports.signUpConfirmation = (email, user, username, password) => {
  const mailOptions = {
    from: '"theglobalasset" admin@theglobalasset.com',
    to: email,
    subject: "Email Confirmation",
    html: `Congratulation ${user}. You have signed up to theglobalasset.com with <br/> the username ${username} and password ${password}. please copy the link to your browser <br/> <b>http://www.theglobalasset.com/signin<b>.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
