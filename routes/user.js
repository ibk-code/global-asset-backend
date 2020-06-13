const express = require('express');
const router = express.Router();

const userCtrl = require ('../controllers/User');
const forgetPassWord = require('../controllers/forgotPassword')
const adminLogin = require('../controllers/AdminLogin')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/forgotpassword', forgetPassWord.forgotPassword);
router.post('/adminlogin', adminLogin.login)

module.exports = router;