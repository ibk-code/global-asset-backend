const UserSignUp = require('../models/signUp');
const jwt = require('jsonwebtoken');

exports.UpdateBalance = (req, resp, next) => {
    const userId = {_id: req.body.id}
    UserSignUp.findById(userId._id)
        .then(res =>{
            const {btcBalance} = res;
            const {status: {deposit} } = res; 
            const addedBtc = Number(req.body.addedBtc)
            const newBalance = (Number(btcBalance) + addedBtc).toFixed(4);
            const newDeposit = (Number(deposit) + addedBtc).toFixed(4);
            const balcString = newBalance.toString();
            const depositString = newDeposit.toString();
            UserSignUp.findByIdAndUpdate(userId, {$set: {btcBalance: balcString, "status.deposit": depositString}}, { useFindAndModify: false },  (upadateErr, updateRes) => {
                if (upadateErr) {
                    resp.status(400).json({
                        message: "An error occured updating btc balance"
                    })
                }else{
                    resp.status(200).json({
                        message: "Added to user bitcoin",
                        
                    })
                }
            })

        })
}