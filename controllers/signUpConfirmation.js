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

exports.signUpConfirmation = (email) => {
      const mailOptions = {
        from: '"theglobalasset" admin@theglobalasset.com',
        to: email,
        subject: "Email Confirmation",
        html: `<p>click on the link to confirm your email address <a href="http://localhost:3000/signin"> Confirm your email</a></p>`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
        }
      });
};
