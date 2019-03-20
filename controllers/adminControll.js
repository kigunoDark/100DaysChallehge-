const User = require('../models/users');
const Accepted = require('../models/accepted-team');
const TeamMate = require('../models/team');
const path = require('path');
const moment = require('moment');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const fileHelper = require('../util/file');
const nodemailer = require('nodemailer');
const sendgridTransport= require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const {validationResult } = require('express-validator/check');
const sequelize = require('../data/database');
let sizeOf = require('image-size');
let totalItems = 0;

require('dotenv').config();
console.log(process.env.SENDGRID_API_KEY)

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: process.env.SENDGRID_API_KEY
    }
}));


exports.getTeammate = (req,res, next) => {
   const teamId = req.params.id;
   TeamMate.findById(teamId)
   .then(teammate => {
    res.render('./admin/teammate-details',
    { 
       pageTitle: "Профиль сотрудника",
       pageTipe: 'adminIn',
       teammate: teammate
   })
   })
   .catch(err => {
       console.log(err);
   });
}
exports.getEditTeammate = (req, res, next) => {
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

    const teamId = req.params.id;

    TeamMate.findById(teamId)
    .then(teammate => {
        if(!teammate)
        {
            return res.redirect('/')
        }
        res.render('./admin/edit-teammate',{
            pageTitle: "Изменение профиля",
            pageTipe: 'adminIn',
            teammate: teammate,
            editing: editMode,
            errorMessage: message,
            oldInput: {
                mateSurname:'',
                mateName:'',
                mateSecondName:'',
                matePosition:'',
                mateVK:'',
                mateInstagram:'',
                matePhone: '',
                mateAbout: '',
                mateCrowns: '',
                mateHobby:  '',
                mateEmail: '',
                matePhoto: ''
            },
            validationErrors:[]
         
        })
        
    })
    .catch(err => console.log(err));
};

exports.postEditTemmmate = (req, res, next) => {
    const teamId = req.body.teamId;
    const updatedMateSurname = req.body.mateSurname;
    const updatedMateName = req.body.mateName;
    const updatedMateSecondName = req.body.mateSecondName;
    const updatedMatePosition = req.body.matePosition;
    const updatedMateVK = req.body.mateVK;
    const updatedMateInstagram = req.body.mateInstagram;
    const updatedMatePhone = req.body.matePhone;
    const updatedMateAbout = req.body.mateAbout;
    const updatedMateCrowns = req.body.mateCrowns;
    const updatedMateHobby = req.body.mateHobby;
    const updatedMateEmail = req.body.mateEmail;
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
   TeamMate.findById(teamId)

   .then(teammate=>{
       teammate.surname = updatedMateSurname;
       teammate.name = updatedMateName;
       teammate.secondName = updatedMateSecondName;
       teammate.position = updatedMatePosition;
       teammate.vk = updatedMateVK;
       teammate.instagram = updatedMateInstagram;
       teammate.phone = updatedMatePhone;
       teammate.about = updatedMateAbout;
       teammate.crowns = updatedMateCrowns;
       teammate.hobby = updatedMateHobby;
       teammate.email = updatedMateEmail;
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

exports.getAllPar = (req, res) => {
    
    User.findAll()
    .then(users => {
        res.render("./admin/admin-participants", {
            users: users,
            moment: moment,
            pageTitle: "Участники без команды",
            pageTipe: "adminIn"
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getAdminPage = (req,res) => {
    

        res.render('./admin/admin-page',{
            pageTitle: "Страница администратора",
            pageTipe: "adminIn"
        })
}

// we also need a post request for and adminTeam
exports.getAdminTeam = (req, res) => {
    const page = +req.query.page;
    const offset = (page-1) * 2;
    const ITEMS_PER_PAGE = 2;
 
    TeamMate.count()
    .then(numrows => {
        totalItems = numrows;
    })
    
    TeamMate.findAll({
        offset: offset, 
        limit: ITEMS_PER_PAGE})
     .then(teams => {
   
    res.render('./admin/admin-team',
     { 
         
        teams: teams,
        pageTitle: "Команда Вектор",
        pageTipe: 'adminIn',
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
        

    });
    console.log('This is a number of teams:' + totalItems);
    })
    .catch(err => {
        console.log(err);
    })
  
}


exports.getAddAdmin = (req,res) => {

    let message = req.flash('error');
    if(message.length > 0){
        message = message[0];
    } else {
        message = null;
    }
    Admin.findAll()
    .then( admins => {
        res.render('./admin/admin-new',{
            admins: admins,
            pageTitle: "Добавить админа",
            pageTipe: "adminIn",
            editing: false,
            errorMessage: message,
            oldInput: {
                email:'',
                password: '',
                name: '',
                surname: '',
                cunfurmPassword:''
                
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.postAddAdmin = (req,res) => {
    const email= req.body.adEmail;
    const name = req.body.adName;
    const surname = req.body.adSurname;
    const password = req.body.adPassword;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.status(422).render('./admin/admin-new',{
            pageTitle: "Добавить сотрудника",
            pageTipe: "adminIn",
            editing: false,
            errorMessage: errors.array()[0].msg,
            oldInput: {  
                email: '',
                name: '',
                surname: '',
                password: ''  
            }
        });
    }
         bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const admin = new Admin({
                email: email,
                name: name,
                surname: surname,
                password: hashedPassword 
            });
            return admin.save();
        }) 
        .then(result => {
            res.redirect('/admin/admins');
           return transporter.sendMail({
                to: email,
                from: 'kiguno1996@gmail.com',
                subject: 'Вас назвначили администратором в топовой компании Vector! Поздравляю!',
                html: '<h1 style="padding: 5%; margin: 0 auto;"> Вы успешно назначенны администратором!!! </h1>',
                html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Задача организации, в особенности же реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации форм развития. С другой стороны дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации модели развития. С другой стороны реализация намеченных плановых заданий представляет собой интересный эксперимент проверки новых предложений. Повседневная практика показывает, что новая модель организационной деятельности способствует подготовки и реализации новых предложений. Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение дальнейших направлений развития. Повседневная практика показывает, что новая модель организационной деятельности требуют определения и уточнения направлений прогрессивного развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что начало повседневной работы по формированию позиции способствует подготовки и реализации направлений прогрессивного развития. Задача организации, в особенности же начало повседневной работы по формированию позиции играет важную роль в формировании форм развития. Повседневная практика показывает, что реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. </p>'
            });
         
        })
        .catch(err=> {
            console.log(err);
    })
}

exports.getAddTeammate = (req,res) => {
    let message = req.flash('error');
    if( message.length > 0)
    {
        message = message[0];
    } else {
        message = null;
    }

    res.render('./admin/edit-teammate',{
        pageTitle: "Добавление сотрудника",
        pageTipe: "adminIn",
        editing: false,
        errorMessage: message,
        oldInput: {
            mateSurname:'',
            mateName:'',
            mateSecondName:'',
            matePosition:'',
            mateVK:'',
            mateInstagram:'',
            matePhone: '',
            mateAbout: '',
            mateCrowns: '',
            mateHobby:  '',
            mateEmail: '',
            matePhoto: ''
        },
        validationErrors:[]
    });
}

exports.addNewTeamMate = (req, res) => {

   const mateSurname = req.body.mateSurname;
   const mateName = req.body.mateName;
   const mateSecondName = req.body.mateSecondName;
   const matePosition = req.body.matePosition;
   const mateVK = req.body.mateVK;
   const mateInstagram = req.body.mateInstagram;
   const matePhone = req.body.matePhone;
   const mateAbout = req.body.mateAbout;
   const mateCrowns = req.body.mateCrowns;
   const mateHobby = req.body.mateHobby;
   const mateEmail = req.body.mateEmail;
   const matePhoto = req.file;

   const errors = validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(422).render('./admin/edit-teammate',{
            pageTitle: "Добавление Cотрудника",
            pageTipe: "adminIn",
            editing: false,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                mateSurname: mateSurname,
                mateName: mateName,
                mateSecondName: mateSecondName,
                matePosition: matePosition,
                mateVk: mateVK,
                mateInstagram: mateInstagram,
                matePhone: matePhone,
                mateAbout: mateAbout,
                mateCrowns: mateCrowns,
                mateHobby:  mateHobby,
                mateEmail: mateEmail,
                matePhoto: matePhoto
            },
            validationErrors: errors.array()
        });

    }
   if(!matePhoto)
   {
       console.log(" you didn't get the data");
       res.redirect('/admin/adminTeam/?page=1');
   }

   const imageUrl = matePhoto.path;
  
   TeamMate.create({
        name: mateName,
        secondName: mateSecondName,
        surname: mateSurname,
        position: matePosition,
        instagram: mateInstagram,
        vk: mateVK,
        phone: matePhone,
        about: mateAbout,
        hobby: mateHobby,
        crowns: mateCrowns,
        email: mateEmail,
        photo: imageUrl
    })
    .then(result => {
        console.log('Created User');
        res.redirect('/admin/adminTeam/?page=1')
    }).catch( err => {
        console.log(err);
    });

} 

exports.postDeleteTeamMate = (req, res) => {
    const id = req.body.teamMateId;
    const page = req.query.page;

 
    TeamMate.findById(id)
    .then(teammate => {
        if(!teammate)
        {
            return next(new Error ('Teammate not found'));
        }
        fileHelper.deleteFile(teammate.photo);
        return teammate.destroy();
    })
    .then(result => {
        console.log("DESTROYED TEAMMATE");
        res.redirect('/admin/adminTeam/?page=1');
    })  
    .catch(err => console.log(err));
}

exports.postDeleteAdmin = (req,res) => {
    const id = req.body.adminId;
    Admin.findById(id)
    .then( admin => {
        return admin.destroy();
    })
    .then( result => {
        console.log("DESTROYED ADMIN");
        res.redirect('/admin/admins');
    })
}
exports.getAdminGroup = (req, res) =>{
    User.findAll()
    .then(users => {
    res.render('./admin/admin-group', {
        users: users,
        pageTitle: "Команды участников",
        pageTipe: 'adminIn'
    })
})
    .catch(err => {
        console.log(err);
    })
}

exports.getReset = (req, res, next) => {
    res.render('./admin/reset',{
        pageTitle: "Изменить пароль администратора",
        pageTipe: "adminIn"
    })
}
exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err);
            return res.redirect('/admin/reset');
        }
        const token = buffer.toString('hex');
        Admin.findOne({where: {email: req.body.adEmail}}).
        then(admin => {
            if(!admin){
                console.log('You do not account with that email');
            }
            admin.resetToken = token;
            admin.resetTokenExpiration = Date.now() +  3600000;
            return admin.save();
        })
        .then(result => {
            res.redirect('/admin/admins');
            transporter.sendMail({
                to: req.body.adEmail,
                from: 'kiguno1996@gmail.com',
                subject: 'Пароль изменен',
                html: `<h1 style="padding: 5%; margin: 0 auto;"> Вы успешно поменяли пароль</h1>
                <p style="text-align: justify; padding: 5%; margin: 0 auto;"> Нажмите на <a href="http://localhost:3000/admin/reset/${token}">ссылку</a> чтобы получить новый пароль  </p>`
            });
         

        })
        .catch(err =>{
            console.log(err);
        });
    })
}

exports.getResetPassword = (req, res ,next) => {
    const token = req.params.token;
    Admin.findOne({where: {resetToken:token,resetTokenExpiration: {$gt: Date.now()}}})
    .then(admin => {
        res.render('./admin/new-password',{
            pageTitle: "Изменить пароль администратора",
            pageTipe: "adminIn",
            adminId: admin.id.toString(),
            passwordToken: token
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.adNewPassword;
    const adminId = req.body.adminId;
    const passwordToken = req.body.passwordToken;
    let resetAdmin;
    Admin.findOne({where: {resetToken: passwordToken , resetTokenExpiration: {$gt: Date.now()}, id: adminId}})
    .then(admin => {
        resetAdmin = admin;
         return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
        resetAdmin.password = hashedPassword;
        resetAdmin.token = null;
        resetAdmin.resetTokenExpiration = undefined;
        return resetAdmin.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postToCamp = (req, res) => {
    const pageNumber = req.params.pageNumber;
    const teamId = req.body.teamId;
    console.log('This is a page number:' + pageNumber);
    const name =  req.body.teamMateName;
    const secondName = req.body.teamMateSecondName;
    const surname = req.body.teamMateSurname;
    const position = req.body.teamMatePosition;
    const vk = req.body.teamMateVk;
    const instagram = req.body.teamMateInstagram;
    const email = req.body.teamMateEmail;
    const photo = req.body.teamMatePhoto;

    

    Accepted.findOne({where: {email: email}})
    .then(userDoc =>{
    if(userDoc)
    {
        console.log('Пользователь с таким email уже принят в команду.');
        return res.redirect('/admin/adminTeam/?page=' + page);
    }

    
    Accepted.create({
        name:name,
        secondName: secondName,
        surname: surname,
        position: position,
        vk: vk,
        instagram: instagram,
        email: email,
        photo: photo,
        page: pageNumber
    })
  
    .then(result => {
        console.log('Accepted Teammate');
        res.redirect('/admin/adminTeam/?page=1')
           return transporter.sendMail({
                to: email,
                from: 'kiguno1996@gmail.com',
                subject: 'Поздравляем вы стали частью команды Вектор и едете работать вместе с нами!',
                html: '<h1 style="padding: 5%; margin: 0 auto;"> Вы успешно назначенны администратором!!! </h1>',
                html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Задача организации, в особенности же реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации форм развития. С другой стороны дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации модели развития. С другой стороны реализация намеченных плановых заданий представляет собой интересный эксперимент проверки новых предложений. Повседневная практика показывает, что новая модель организационной деятельности способствует подготовки и реализации новых предложений. Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение дальнейших направлений развития. Повседневная практика показывает, что новая модель организационной деятельности требуют определения и уточнения направлений прогрессивного развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что начало повседневной работы по формированию позиции способствует подготовки и реализации направлений прогрессивного развития. Задача организации, в особенности же начало повседневной работы по формированию позиции играет важную роль в формировании форм развития. Повседневная практика показывает, что реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. </p>'
            });
         
        })
        .catch(err=> {
            console.log(err);
        });
       
    }) .catch(err=> {
        console.log(err);
    });

}

exports.getAcceptedTeam = (req, res, next) => {
    Accepted.findAll()
    .then(accepted => {
        res.render('./accepted/accepted-team',{
            acTeam: accepted,
            pageTitle: "Команда Вектор",
            pageTipe: 'adminIn'
        })

    })
    .catch(err => {
        console.log(err);
    })  
}

exports.postDeleteAceepted = (req, res) => {
    const id = req.body.teamMateId;
    Accepted.findById(id)
    .then(teammate => {
        if(!teammate)
        {
            return next(new Error ('Teammate not found'));
        }
        return teammate.destroy();
    })
    .then(result => {
        console.log("DESTROYED TEAMMATE FROM ACCEPTED");
        res.redirect('/admin/accepted-team');
        return transporter.sendMail({
            to: email,
            from: 'kiguno1996@gmail.com',
            subject: 'Вас только что убрали из команды Вектор!',
            html: '<h1 style="padding: 5%; margin: 0 auto;"> Вы успешно назначенны администратором!!! </h1>',
            html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Задача организации, в особенности же реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации форм развития. С другой стороны дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации модели развития. С другой стороны реализация намеченных плановых заданий представляет собой интересный эксперимент проверки новых предложений. Повседневная практика показывает, что новая модель организационной деятельности способствует подготовки и реализации новых предложений. Таким образом постоянный количественный рост и сфера нашей активности позволяет оценить значение дальнейших направлений развития. Повседневная практика показывает, что новая модель организационной деятельности требуют определения и уточнения направлений прогрессивного развития. Не следует, однако забывать, что дальнейшее развитие различных форм деятельности в значительной степени обуславливает создание системы обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что начало повседневной работы по формированию позиции способствует подготовки и реализации направлений прогрессивного развития. Задача организации, в особенности же начало повседневной работы по формированию позиции играет важную роль в формировании форм развития. Повседневная практика показывает, что реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. </p>'
        });
    })  
    .catch(err => console.log(err));
}
