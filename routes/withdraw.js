const express = require('express');
const router = express.Router();

const withdrawController = require('../controllers/withdraw');

const authUser = require('../middlewares/auth')

router.put('/withdraw', authUser, withdrawController.Withdraw);

module.exports = router;