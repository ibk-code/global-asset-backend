const bcrypt = require('bcrypt');
const UserSignUp = require('../models/signUp');
const UserLogin = require('../models/signIn');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(
            (hash) => {
            const user = new UserSignUp({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                btcId: req.body.btcId,
                plan: req.body.plan
            })
            user.save().then(
                () => {
                    res.status(201).json({
                        message: "User was successfully created"
                    })
                }
            ).catch
        })
        console.log("I ran signup")
}


exports.login = (req, res, next) => {
    UserSignUp.findOne({email: req.body.email}).then(
        (user) => {
            if(!user){
                return res.status(401).json({
                    error: new Error("User not found")
                })
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if(!valid) {
                        return res.status("401").json({
                            error: new Error("Incorrect password try again")
                        })
                    }
                    const token = jwt.sign(
                        {userId: user._id},
                        'GLOBAL-ASSET-BTC-TOKEN',
                        { expiresIn: '12h' });
                        res.status(200).json({
                            message: "User login Successfully",
                            userId: unescape._id,
                            token: token
                        });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: new Error("Server internal error")
                    })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: new Error("Server internal error")
            })
        }
    )
}