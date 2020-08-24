const UserSignUp = require('../models/signUp');
const nodeMailer =  require('nodemailer');

let transporter = nodeMailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    auth: {
      user: "admin@theglobalasset.com",
      pass: "Globalasset@2020"
    }
});


exports.Withdraw = (req, res, next) => {
    const userId = req.body.id;
    UserSignUp.findById(userId)
        .then(obj => {
            const withdrawStatus = obj.withdraw ? "open" : "closed"
            if (obj.withdraw) {
                const mailOptions = {
                    from: '"theglobalasset" admin@theglobalasset.com',
                    to: "admin@theglobalasset.com",
                    subject: 'Withdrawl Message',
                    text: `Withdraw request of $${req.body.amount} from user ${obj.name} with id ${obj._id} with email address of ${obj.email} into wallet address of ${req.body.address} in ${req.body.payMethod} and withdraw status ${withdrawStatus} `
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                });
                
                const withdrawn = Number(req.body.amount);
                const formerBalance = Number(obj.balance);
                const updatedBalance = (formerBalance - withdrawn).toFixed(2);
                const btcStrBalc = updatedBalance.toString();
                UserSignUp.findByIdAndUpdate(userId, {balance: btcStrBalc}, {new: true, useFindAndModify: false}, (uErr, uRes) => {
                    if (uErr) {
                        res.status(400).json({
                            message:"An error occured, please try again"
                        })
                    }else{
                        res.status(200).json({
                            message:"Your withdraw was successful",
                            balance: uRes.balance,
                            withdraw: uRes.withdraw
                        })
                    }
                })
            }else{
                const mailOptions = {
                    from: '"theglobalasset" admin@theglobalasset.com',
                    to: "admin@theglobalasset.com",
                    subject: 'Withdrawl Message',
                    text: `Withdraw request of $${req.body.amount} from user ${obj.name} with id ${obj._id} with email address of ${obj.email} into wallet address of ${req.body.address} in ${req.body.payMethod} and withdraw status ${withdrawStatus}`
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.status(200).json({
                        message:"Your access to withdraw is being reviewed",
                        withdraw: obj.withdraw
                      })
                    }
                });
            }
            
        })
        .catch(e => {
            res.status(400).json({
                message:"User not Found",
                withdraw: obj.withdraw
            })
        })
}