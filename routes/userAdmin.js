const express = require('express');
const router = express.Router();

const authUser = require('../middlewares/auth')

const userAdmin = require('../controllers/Updatebtc');

router.put('/btcBalance', authUser, userAdmin.UpdateBalance);

module.exports = router;