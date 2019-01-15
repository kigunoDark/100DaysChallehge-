const express = require('express');
const router = express.Router();
const userControll = require('../controllers/user');

router.get('/', userControll.getLanding);

module.exports = router;