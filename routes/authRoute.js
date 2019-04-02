const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

router.post('/user-login', authControl.postLogin);
router.get('/user-login', authControl.getUserLogin);
router.post('/user-logout', authControl.postLogout);


module.exports =  router;