const bcrypt = require('bcrypt');
const UserSignUp = require('../models/signUp');

exports.forgotPassword = (req, res, next) => {
    UserSignUp.findById({_id: req.body.id}, (err, user) => {
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
                            UserSignUp.findByIdAndUpdate({_id: req.body.id}, {password: hash}, {useFindAndModify: false}, (err, respon) => {
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