const nodeMailer = require("nodemailer");

exports.contact = (req, res) => {
  console.log(req.body);
  let transporter = nodeMailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@theglobalasset.com",
      pass: "Globalasset@2020",
    },
  });

  const mailOptions = {
    from: '"theglobalasset" admin@theglobalasset.com',
    to: "admin@theglobalasset.com",
    subject: "Contact Message",
    text: `${req.body.name}\n ${req.body.phone}\n ${req.body.email}\n ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
          message: "Your information was successfully submited"
      })
    }
  });
};
