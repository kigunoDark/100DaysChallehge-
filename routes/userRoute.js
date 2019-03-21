const express = require('express');
const router = express.Router();
const userControll = require('../controllers/userControll');
const {check, body} =  require('express-validator/check');

router.get('/', userControll.getLanding);
router.post('/add-user',
check('parFio')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),

check('parCity')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),

check('parEmail')
.isEmail()
.withMessage(
    'Вы ввели не правильный email адресс.'
),
check('parUnivercity')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),



check('parSocial')
.isURL()
.withMessage(
    'Введите правильную ссылку.'
),

check('parPosition')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),

check('parSocityExp')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),


check('parEventsExp')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),

check('parCharacter')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),


check('parStrengths')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),

check('parWhy')
.custom((value, {req}) => {
    if(value === '')
    {
        return Promise.reject(
            'Поля не могут быть пустыми'
        )
    }
    return true;
}),
body('parWhy',
'Пожалуйста напишите подробнее о том, почему вы хотите участвовать и почему именно вы. Должно быть не менее 100 символов'
).isLength({min:100, max: 250}).isAscii(),
check('parPhone')
.isMobilePhone()
.withMessage('Вы ввели не верный мобильный телефон.'),

// check('parCheck')
// .custom((value, {req}) => {
//     if(value !== 'Да')
//     {
//         return Promise.reject(
//             'К сожалению мы не можем принять заявку без согласия на обработку персональных данных'
//         )
//     }
//     return true;
// }),





 userControll.addNewUser);

module.exports = router;