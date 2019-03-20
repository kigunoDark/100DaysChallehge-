const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');
const {check, body} =  require('express-validator/check');

router.get('/', userControll.getLanding);
router.post('/add-user',
check('parFio')
.isEmail()
.withMessage('Поля не могут быть пустыми.'),
 userControll.addNewUser);

module.exports = router;