const express = require('express');
const router = express.Router();

const ContactControlller = require('../controllers/Contact');
router.post('/contact', ContactControlller.contact);

module.exports = router;