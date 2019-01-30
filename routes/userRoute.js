const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');

router.get('/', userControll.getLanding);
router.post('/add-user', userControll.addNewUser);

module.exports = router;