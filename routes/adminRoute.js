const express = require('express');
const {check, body} =  require('express-validator/check');
const router = express.Router();
const adminControll = require('../controllers/adminControll');
const isAuth = require('../middleware/is-auth');



router.get('/adminPar', isAuth, adminControll.getAllPar);
router.get('/adminPar/:id', isAuth, adminControll.getUser);
router.get('/accepted-team', isAuth, adminControll.getAcceptedTeam);
router.get('/adminTeam', isAuth, adminControll.getAdminTeam);
router.get('/add-teammate',isAuth, adminControll.getAddTeammate);
router.get('/detail-teammate/:id', isAuth, adminControll.getTeammate);
router.get('/edit-teammate/:id', isAuth, adminControll.getEditTeammate);
router.get('/admins', isAuth, adminControll.getAddAdmin);
router.get('/reset', isAuth, adminControll.getReset);
router.post('/reset',isAuth, adminControll.postReset);
router.get('/reset/:token', isAuth, adminControll.getResetPassword);
router.post('/new-password', isAuth, adminControll.postNewPassword);
router.post('/admin-add', 
[
    check('adName')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('adSurname')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true
    }),
    check('adEmail')
    .isEmail()
    .withMessage('Пожалуйста, введите правильный email.')
    .custom((value, { req }) => {
       return Admin.findOne({where: {email: value}})
        .then(userDoc =>{
            if(userDoc){
                return Promise.reject(
                    'Данный email адресс уже занят другим пользователем.'
                )
            }
        });
    }),

    body('adPassword',
    'Введите пароль правильно , не меньше 6 символов и используя числа с кириллицей'
    ).isLength({min:6, max: 250}).isAscii(),

    body('adRPassword').custom((value, {req}) => {
        if(value !== req.body.adPassword ){
            throw new Error ('Пароли не совпали, попробуйте ввести снова.')
        }
        return true;
    })
],
     isAuth, adminControll.postAddAdmin);
     
router.post('/add-camp', isAuth, adminControll.postToCamp);
router.post('/admin-addTeammate',
[
    check('mateSurname')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('mateName')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('mateSecondName')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('matePosition')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('mateEmail')
    .isEmail()
    .withMessage(
        'Вы ввели не верный email адресс, повторите еще раз.'
    ),
    check('mateVK')
    .isURL()
    .withMessage("Вы ввели не правильную ссылку")
    ,
    check('mateInstagram')
    .isURL()
    .withMessage("Вы ввели не правильную ссылку")
    ,
    check('matePhone')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('mateAbout')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('mateHobby')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    check('mateCrowns')
    .custom((value, {req}) => {
        if(value === '')
        {
            return Promise.reject(
                'Поля не могут быть пустыми'
            )
        }
        return true;
    }),
    
]
,isAuth, adminControll.addNewTeamMate);
router.post('/delete-mate', isAuth, adminControll.postDeleteTeamMate);
router.post('/delete-admin', isAuth, adminControll.postDeleteAdmin);
router.post('/edit-teammate', isAuth, adminControll.postEditTemmmate);
router.post('/delete-accepted', isAuth, adminControll.postDeleteAceepted);

module.exports = router;