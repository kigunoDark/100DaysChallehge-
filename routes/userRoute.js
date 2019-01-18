const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');

router.get('/', userControll.getLanding);

router.post('/add-paruser', userControll.postNewUser);

module.exports = router;