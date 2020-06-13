const bcrypt = require('bcrypt');
const UserSignUp = require('../models/signUp');

exports.forgotPassword = (req, res, next) => {
    UserSignUp.findOne({email: req.body.email}, (err, user) => {
        if (user === null) {
            res.status(400).json({
                message: "This user does not exist"
            })
            return;
        }else{
            bcrypt.compare(req.body.newPassword, user.password)
            .then(valid => {
                if (valid) {
                    res.status(400).json({
                        message: "Can't set password to former password",
                        error: new Error("Set a new password")
                    })
                }

                if (!valid) {
                    bcrypt.hash(req.body.newPassword, 10)
                        .then(hash => {
                            UserSignUp.findOneAndUpdate({email: req.body.email}, {password: hash}, {useFindAndModify: false}, (err, respon) => {
                                if(err){
                                    res.status(400).json({
                                        message: "An error occured when setting password",
                                    })
                                }else{
                                    res.status(200).json({
                                        message: "Password has been changed successfully",
                                    })
                                }
                            })
            
                        })
                }
            })
        }

    })
}