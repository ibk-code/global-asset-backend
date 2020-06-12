const nodeMailer = require("nodemailer");

exports.contact = (req, res) => {
  console.log(req.body);
  let transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0a7e532c27433a",
      pass: "4012f61639b2eb",
    },
  });

  const mailOptions = {
    from: "438e1da98e-5755d0@inbox.mailtrap.io",
    to: "438e1da98e-5755d0@inbox.mailtrap.io",
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
