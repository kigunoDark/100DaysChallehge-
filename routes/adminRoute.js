const express = require('express');
const router = express.Router();
const adminControll = require('../controllers/adminControll');


router.get('/adminPage',adminControll.getAllUsers);


module.exports = router;