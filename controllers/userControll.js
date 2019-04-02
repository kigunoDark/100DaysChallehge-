const User = require('../models/users');
const Role = require('../models/roles');
const Acceptedd = require('../models/accepted-team');
const sizeOf = require('image-size');
const moment = require('moment');
const {validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const sendgridTransport= require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: process.env.SENDGRID_API_KEY
    }
}));


exports.getLanding = (req, res) => {
       let message = req.flash('error');
    if(message.length > 0)
    {
        messege = message[0];
    } else {
        message = null;
    }

   Acceptedd.findAll()
    .then(teams => {
    res.render('./users/landingPage',
     {   
        teams: teams,
        pageTitle: "ВекторСКФО",
        pageTipe:"users",
        path: '/',
        errorMessage: message,
        oldInput: {
            parFio:'',
            parCity:'',
            parUnivercity:'',
            parEmail:'',
            parPhone:'',
            parDate:'',
            parSocial:'',
            parPosition:'',
            parExp:'',
            parSocityExp:'',
            parEventsExp:'',
            parCharacter:'',
            parStrengths:'',
            parWhy:'',
            parSize:'',
            parPhoto:''
        },
        validationErrors:[]
        
    });
    })
    .catch(err => {
        console.log(err);
    })

}

exports.postSignUp = (req,res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const secondname = req.body.secondname;
    const city = req.body.city;
    const univercity = req.body.univercity;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const social = req.body.social;
    const position = req.body.position;
    const exp = req.body.exp;
    const socityExp = req.body.socityExp;
    const eventsExp = req.body.eventsExp;
    const character = req.body.character;
    const strengths = req.body.strengths;
    const why = req.body.why;
    const size = req.body.size;
    const password = req.body.password;
    const photo = req.file;
    const roleId = req.body.roleId;
    
    const errors = validationResult(req);
    if(!photo)
    {
        console.log(" you didn't get the data");
        res.redirect('/');
    }
    const imageUrl = photo.path;
    var dimensions = sizeOf(imageUrl);
   
    if(dimensions.height != dimensions.width || dimensions.height > 800 || dimensions.width > 800 )
    {
        req.flash('errors', 'Ширина и высота изображения должны быть одинаковы и не меньше 800px')
        console.log('Ошибка с картинкой');
        return res.redirect('/');
    }
    
    if(!errors.isEmpty()){
        console.log('Произошла ошибка и ее должно вывести');
        User.findAll()
        .then(users => {
        return  res.status(422).render('./users/landingPage',{
            users: users,
            pageTitle: "ВекторСКФО",
            pageTipe: "users",
            editing: false,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                name: name,
                surname: surname,
                secondname: secondname,
                city: city,
                univercity:univercity,
                email: email,
                phone: phone,
                date: date,
                social: social,
                position: position,
                exp: exp,
                socityExp: socityExp,
                eventsExp: eventsExp,
                character: character,
                strengths: strengths,
                why: why,
                size: size,
                photo: photo,
                roleId:  roleId
            },
            validationErrors: errors.array()
            
       });
    })
    .catch(err => {
        console.log(err);
    })
    }
    User.findOne({where: {email: email}})
    .then(userDoc =>{
        if(userDoc){
            return Promise.reject(
                'Данный email адресс уже занят другим пользователем.'
            )
        }
    });
    
         bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                surname: surname,
                secondname: secondname, 
                city: city,
                univercity: univercity,
                email: email,
                phone: phone,
                date: date,
                social: social,
                position: position,
                exp: exp,
                socityExp: socityExp,
                eventsExp: eventsExp,
                character: character,
                strengths: strengths,
                why: why,
                size: size,
                photo: imageUrl,
                password: hashedPassword,
                roleId: roleId
               
            });
            return user.save();
        }) 
        .then(result => {
            res.redirect('/user-login');
           return transporter.sendMail({
                to: email,
                from: 'kiguno1996@gmail.com',
                subject: 'Поздравляем, вы прошли первый этап регистрации "ВекторСКФО',
                html: '<h1 Команда вектор ждет тебя!!! </h1>',
                html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Добрый день. Сейчас вы зарегестрировались участник. Если у вас есть команда вы можете найти ее в списке и присоединиться к ней, также вы можете создать команду и пригласить в нее участников. </p>'
            }); 
        })
        .catch(err=> {
            console.log(err);
    })
}


exports.getMainPage = (req,res) => {
        const userId = req.session.user.id;
        const name = req.session.user.name;
        const surname = req.session.user.surname;
        User.findById(userId
            // include:
            // [{
            // model: User,
            // where: {id:roleId }
            // }]
        ).then(user => {
            // roleName = posts[0].name;
            res.render('./users/profile-page',{
                user: user,
                name: name,
                surname: surname,
                moment: moment,
                pageTitle: "Страница администратора",
                pageTipe: "adminIn"
            })

        })         
}

exports.getEditUser = (req, res, next) => {
    var name = req.session.user.name;
    var surname = req.session.user.surname;
    let message = req.flash('error');
    if(message.length > 0)
    {
        messege = message[0];
    } else {
        message = null;
    }
 
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }

    const userId = req.params.id;

    User.findById(userId)
    .then(user => {
        if(!user)
        {
            return res.redirect('/')
        }
        res.render('./users/edit-user',{
            pageTitle: "Изменение профиля",
            pageTipe: 'adminIn',
            user: user,
            name: name,
            surname: surname,
            editing: editMode,
            errorMessage: message,
            validationErrors:[]
         
        })
        
    })
    .catch(err => console.log(err));
};

exports.postEditUser = (req, res, next) => {

    const updatedName= req.body.name;
    const updatedSurname = req.body.surname;
    const updatedSecondName = req.body.secondname;
    const updatedEmail = req.body.email;
    const updatedDate = req.body.date;
    const updatedCity = req.body.city;
    const updatedXocial = req.body.social;
    const updatedPosition = req.body.position;
    const updatedPhone = req.body.phone;
    const updatedUnivercity = req.body.univercity;
    const updatedSocialExp = req.body.socityExp;
    const updatedSize = req.body.size;
    const updatedExp = req.body.exp;
    const updatedEventsExp = req.body.eventsExp;
    const updatedCharacter = req.body.character;
    const updatedStrengths = req.body.strengths;
    const updatedWhy = req.body.why;
    const userId = req.body.userId;


    const updatedMatePhoto = req.file;

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return  res.status(422).render('./admin/edit-teammate',{
            pageTitle: "Изменение Cотрудника",
            pageTipe: "adminIn",
            editing: true,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                mateSurname: updatedMateSurname,
                mateName: updatedMateName,
                mateSecondName: updatedMateSecondName,
                matePosition: updatedMatePosition,
                mateVk: updatedMateVK,
                mateInstagram: updatedMateInstagram,
                matePhone: updatedMatePhone,
                mateAbout: updatedMateAbout,
                mateCrowns: updatedMateCrowns,
                mateHobby: updatedMateHobby ,
                mateEmail: updatedMateEmail,
                matePhoto: updatedMatePhoto
            },
            validationErrors: errors.array()
        });
    }
   User.findById(userId)

   .then(user=>{
       
       if(updatedMatePhoto){
           fileHelper.deleteFile(teammate.photo);
           teammate.photo = updatedMatePhoto.path;
       }
       return teammate.save();
   })
   .then(retult =>{
       console.log('Updated product');
       res.redirect('/admin/adminTeam/?page=1');
   })
   .catch(err => console.log(err));

}

exports.getUser = (req,res, next)  => {
    const id = req.params.id;

    User.findById(id)
    .then(user => {
        if(!user){
            res.redirect('/');
        }
        res.render("./admin/user-details", {
            moment: moment,
            user: user,
            pageTitle: "Профиль пользователя",
            pageTipe: "adminIn",
            path: "/admin/userDetails"
        })
    })
    .catch(err => {
        console.log(err);
    })
}
