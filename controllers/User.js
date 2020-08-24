const bcrypt = require('bcrypt');
const UserSignUp = require('../models/signUp');
const referralFunc = require('./Referred');
const jwt = require('jsonwebtoken');
const signUpVerfication = require('./signUpConfirmation')

exports.signup = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(
            (hash) => {
            if (req.body.referralId !== " " || null || undefined) {
                referralFunc.referred(req.body.referralId)
            }

            const user = new UserSignUp({
                name: req.body.name,
                userName: req.body.username,
                email: req.body.email,
                country: req.body.country,
                password: hash,
                plan: " ",
                withdraw: false,
                referralCount: 0,
                balance: '0.00',
                "status.deposit": '0.00',
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
                                withdraw: user.withdraw,
                                country: user.country,
                                name: user.name,
                                userName: user.userName,
                                email: user.email,
                                balance: user.balance,
                                referrals: user.referralCount,
                                deposit: user.status.deposit,
                                token: token
                        });
                        console.log("I ran signup")
                        signUpVerfication.signUpConfirmation(user.email)
                    }
                ).catch(e => {
                    res.status(400).json({
                        message: "Please fill all the fieldn or user already exist"
                    })
                })
        })
        .catch(e => {
            console.log(e)
            res.status(400).json({
                message: "The check your details or the user already exist"
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
                                withdraw: user.withdraw,
                                country: user.country,
                                name: user.name,
                                userName: user.userName,
                                email: user.email,
                                balance: user.balance,
                                referrals: user.referralCount,
                                withdraw: user.withdraw,
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