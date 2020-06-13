const bcrypt = require('bcrypt');
const UserSignUp = require('../models/signUp');
const referralFunc = require('./Referred');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(
            (hash) => {
            if (req.body.referralId !== " " || null || undefined) {
                referralFunc.referred(req.body.referralId)
            }

            const user = new UserSignUp({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                btcId: req.body.btcId,
                plan: req.body.plan,
                referralCount: 0,
                btcBalance: '0.0000',
                "status.deposit": '0.0000',
                "status.lastIncrementedTime": Date.now(),
                "status.referralBonus": 0
            })

            user.save()
                .then(
                    newObj => {
                        const token = jwt.sign(
                            {userId: user._id},
                            'GLOBAL-ASSET-BTC-TOKEN',
                            { expiresIn: '12h' });
                            res.status(200).json({
                                message: "Account creation was, successful",
                                userId: user._id,
                                plan: user.plan,
                                walletAddress: user.btcId,
                                name: user.name,
                                email: user.email,
                                btcBalance: user.btcBalance,
                                referrals: user.referralCount,
                                deposit: user.status.deposit,
                                token: token
                        });
                        console.log("I ran signup")
                    }
                ).catch(e => {
                    res.status(400).json({
                        message: e.message
                    })
                })
        })
        .catch(e => {
            console.log(e)
            res.status(400).json({
                message: e.message
            })
        })
}


exports.login = (req, res, next) => {
    UserSignUp.findOne({email: req.body.email}).then(
        (user) => {
            if(user === null){
                res.status(400).json({
                    message: "email is incorrect"
                })
                return
            }else{
                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                        if(!valid) {
                            return res.status(400).json({
                                message:"Password is not correct"
                            })
                        }
                        const token = jwt.sign(
                            {userId: user._id},
                            'GLOBAL-ASSET-BTC-TOKEN',
                            { expiresIn: '24h' });
                            res.status(200).json({
                                message: "Account Login was, successful",
                                userId: user._id,
                                plan: user.plan,
                                walletAddress: user.btcId,
                                name: user.name,
                                email: user.email,
                                btcBalance: user.btcBalance,
                                referrals: user.referralCount,
                                deposit: user.status.deposit,
                                token: token
                            });
                    }
                )
            }
        }
    ).catch(
        (e) => {
            res.status(400).json({
                message: "Email is not registered"
            })
        }
    )
}