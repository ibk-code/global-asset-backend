const UserSignUp = require('../models/signUp');
const nodeMailer =  require('nodemailer');



exports.Withdraw = (req, res, next) => {
    const userId = req.body.id;
    UserSignUp.findById(userId)
        .then(obj => {
            let transporter = nodeMailer.createTransport({
                host: "smtp.zoho.com",
                port: 465,
                auth: {
                  user: "admin@theglobalasset.com",
                  pass: "Globalasset@2020"
                }
            });
    
            const mailOptions = {
                from: '"theglobalasset" admin@theglobalasset.com',
                to: "admin@theglobalasset.com",
                subject: 'Withdrawl Message',
                text: `Withdrawl request of ${req.body.amount} from user ${obj.name} with ${obj._id} with email address of ${obj.email} into wallet address of ${req.body.address}, with registered wallet address of ${obj.btcId}`
            };
    
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
    
            const withdrawn = Number(req.body.amount);
            const formerBalance = Number(obj.btcBalance);
            const updatedBalance = (formerBalance - withdrawn).toFixed(4);
            const btcStrBalc = updatedBalance.toString();
            UserSignUp.findByIdAndUpdate(userId, {btcBalance: btcStrBalc}, {new: true}, (uErr, uRes) => {
                if (uErr) {
                    res.status(400).json({
                        message:"An error occured, please try again"
                    })
                }else{
                    res.status(200).json({
                        message:"Your withdraw was successful",
                        newBalance: uRes.btcBalance
                    })
                }
            })
        })
}