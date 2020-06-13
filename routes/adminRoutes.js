const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/adminquery');
const adminLogin = require('../controllers/AdminLogin');
const updateUserBtc = require('../controllers/Updatebtc');

router.post('/user', adminCtrl.singleUser);
router.get('/allusers', adminCtrl.userQuery);
router.post('/login', adminLogin.login);
router.put('/updatebtc', updateUserBtc.UpdateBalance);

module.exports = router;