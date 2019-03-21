const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

router.get('/login', authControl.getLogin);
router.post('/admin-login', authControl.postLogin);
router.get('/admin-login', authControl.getMobileLogin);
router.post('/admin-logout', authControl.postLogout);


module.exports =  router;