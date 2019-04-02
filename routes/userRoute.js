const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');
const {check, body} =  require('express-validator/check');
const isAuth = require('../middleware/is-auth');

router.get('/', userControll.getLanding);
router.post('/signup', userControll.postSignUp);
router.get('/profile', isAuth, userControll.getMainPage);
router.get('/edit-user/:id', isAuth, userControll.getEditUser);

module.exports = router;