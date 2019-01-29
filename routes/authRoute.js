const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

router.get('/login', authControl.getLogin);
router.post('/login', authControl.postLogin);

module.exports =  router;