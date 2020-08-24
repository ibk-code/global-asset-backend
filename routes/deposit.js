const express = require('express');
const router = express.Router();

const depositController = require('../controllers/userDeposit');

const authUser = require('../middlewares/auth')

router.post('/deposit', authUser, depositController.deposit);

module.exports = router;