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

const referralMessage = (email, referalCount, percent) => {
  const mailOptions = {
    from: '"theglobalasset" admin@theglobalasset.com',
    to: email,
    subject: "Email Confirmation",
    html: `<p>Congratulation You have referred a new user to theglobalasset an <br/> you have been rewarded with ${percent}%. Your referral count is now ${referalCount} <br/> Thank you.</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

const updateRefer = (id, count, balc) => {
  UserSignUp.findByIdAndUpdate(
    id,
    { $set: { referralCount: count, balance: balc } },
    { useFindAndModify: false }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.referred = (id) => {
  const userId = { _id: id };
  UserSignUp.findById(id).then((res) => {
    let addedBonus, newBalance, balanceString;
    const { referralCount } = res;
    const updatedCount = referralCount + 1;
    const { balance } = res;
    const {
      status: { deposit },
    } = res;
    const { plan } = res;
    if (plan === "Beginner plan" || " ") {
      addedBonus = (5 / 100) * Number(deposit);
      newBalance = (Number(balance) + addedBonus).toFixed(4);
      balanceString = newBalance.toString();
      console.log(addedBonus);
      console.log(newBalance);
      updateRefer(userId._id, updatedCount, balanceString);
      referralMessage(res.email, updatedCount, "5");
    } else if (plan === "Intermediate plan") {
      addedBonus = (7 / 100) * Number(deposit);
      newBalance = (Number(balance) + addedBonus).toFixed(4);
      balanceString = newBalance.toString();
      updateRefer(userId._id, updatedCount, balanceString);
      referralMessage(res.email, updatedCount, "7");
    } else if (plan === "Advance plan" || "Pro plan") {
      addedBonus = (10 / 100) * Number(deposit);
      newBalance = (Number(balance) + addedBonus).toFixed(4);
      balanceString = newBalance.toString();
      updateRefer(userId._id, updatedCount, balanceString);
      referralMessage(res.email, updatedCount, "10");
    }
  });
};
