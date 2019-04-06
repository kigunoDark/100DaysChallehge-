const User = require('../models/users');
const Role = require('../models/roles');
const Team = require('../models/team');
const sizeOf = require('image-size');
const moment = require('moment');
const sequelize = require('../data/database');
const {validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const sendgridTransport= require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');
const fileHelper = require('../util/file');

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

   Team.findAll()
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
    const status = 'Заявка рассматривается'
    
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
                roleId:  roleId,
              
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
                roleId: roleId,
                status: status
               
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
        const roleId = req.session.user.roleId;

        User.findById(userId).then(user => {
            // roleName = posts[0].name;
            res.render('./users/profile-page',{
                roleId: roleId,
                user: user,
                name: name,
                moment: moment,
                pageTitle: "Страница администратора",
                pageTipe: "adminIn"
            })

        })         
}

exports.getEditUser = (req, res, next) => {
    const name = req.session.user.name;
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
    const updatedSocial = req.body.social;
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
    const updatedPhoto = req.file;

    
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
                matePhoto: updatedPhoto
            },
            validationErrors: errors.array()

        });
    }
   User.findById(userId)

   .then(user=>{
       user.name = updatedName;
       user.surname = updatedSurname;
       user.secondname = updatedSecondName;
       user.Date = updatedDate;
       user.why = updatedWhy;
       user.size = updatedSize;
       user.city = updatedCity;
       user.univercity = updatedUnivercity;
       user.email = updatedEmail;
       user.social = updatedSocial;
       user.position = updatedPosition;
       user.phone = updatedPhone;
       user.socityExp = updatedSocialExp;
       user.exp = updatedExp;
       user.character = updatedCharacter;
       user.eventsExp = updatedEventsExp;
       user.strengths = updatedStrengths;
       req.session.user.name = updatedName;
       
       if(updatedPhoto){
           fileHelper.deleteFile(user.photo);
          user.photo = updatedPhoto.path;
       }
       return user.save();
   })
   .then(retult =>{
       console.log('Updated product');
       res.redirect('/profile');
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


exports.getTeamsPage = (req, res) =>{
    const name = req.session.user.name;
    const userId = req.session.user.id;
    const roleId = req.session.user.roleId;
    const teamId = +req.session.user.teamId;
    console.log('это иди в юзере: ' + teamId);
     
   Team.findAll()
    .then(teams => {
    res.render('./users/teams-page', {
        roleId: roleId,
        userId:userId,
        teamId: teamId,
        teams: teams,
        name: name,
        pageTitle: "Команды участников",
        pageTipe: "adminIn"
    })
})
    .catch(err => {
        console.log(err);
    })
}

exports.getAddTeamPage = (req, res ) => {
    const name= req.session.user.name;
    const userEmail = req.session.user.email;
    res.render("./users/add-team", {
        name: name,
        pageTitle: "Создать команду",
        pageTipe: "adminIn"
    })
}

exports.postAddTeam = (req, res) => {
    const userId = req.session.user.id;
    console.log("Идентификатор настоящего пользователя: " + userId);
    const roleID = 4;
    req.session.user.roleId = roleID;
    console.log(req.session.user.roleId);
 
        const t_name = req.body.t_name;
        const t_social = req.body.t_social;
        const t_exp = req.body.t_exp;
        const t_str = req.body.t_str;
        const t_imp = req.body.t_imp;
        const t_why = req.body.t_why;
        const t_size = req.body.t_size;
        const photo = req.file;

        User.findOne({where: {id: userId }})
        .then( user => {
            if(user)
            {
                user.update({
                    roleId:roleID
                })
                .then(() => {
                    console.log('Все проапдейтилось!!')
                })
            }
        })
     
        if(!photo)
        {
            console.log(" Мы не получили данных где хранится файл");
            res.redirect('/add-team');
        }
        const imageUrl = photo.path;
       
       
        Team.create({
            t_name: t_name,
            t_social: t_social,
            t_exp: t_exp,
            t_str: t_str,
            t_imp: t_imp,
            t_why: t_why,
            t_size: t_size,
            photo: imageUrl,
            userId: userId
            
        })
        .then(result => {
            res.redirect('/teams-page');
           return transporter.sendMail({
                to: userEmail,
                from: 'kiguno1996@gmail.com',
                subject: 'Вы создали свою команду для "ВекторСКФО',
                html: '<h1 Команда вектор ждет тебя!!! </h1>',
                html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Добрый день. Команда "Вектор" хотела бы уведомить вас о том, что вы являетесь лидером новой команды заявка которой будет рассматриваться. Просим вас сообщить вашим ребятам о том, что они могут вступить в нее или пригласить их сами. </p>'
            }); 
        })
      .catch( err => {
            console.log(err);
        });
}

exports.getListOfUsers = (req, res) => {
    const roleId = req.session.user.roleId;
    const name = req.session.user.name;
    const activeUserId = req.session.user.id;
    User.findAll()
    .then( users => {
    res.render('./users/all-users', {
        roleId: roleId,
        activeUserId:activeUserId,
        users: users,
        name: name,
        pageTitle: "Список всех участников без команды",
        pageTipe: "adminIn"
    })
    
})
}

exports.getUserDetails= (req,res, next) => {
    const userId = req.params.id;
    const name = req.session.user.name;
    const activeUserId = req.session.user.id;
    User.findById(userId)
    .then(user => {
     res.render('./users/user-details',
     { 
        name: name,
        activeUserId: activeUserId,
        pageTitle: "Профиль участника",
        pageTipe: 'adminIn',
        user: user,
        moment:moment
    })
    })
    .catch(err => {
        console.log(err);
    });
 }


 exports.getTeamDetails= (req,res, next) => {
    const teamId = req.params.id;
    const name = req.session.user.name;
    const roleId = req.session.user.roleId;
    const activeUserId = req.session.user.id;
    Team.findById(teamId)
    .then(team => {
     res.render('./users/team-details',
     { 
        roleId: roleId,
        name: name,
        activeUserId: activeUserId,
        pageTitle: "Профиль участника",
        pageTipe: 'adminIn',
        team: team,
        moment:moment
    })
    })
    .catch(err => {
        console.log(err);
    });
 }

exports.postAddRequest = (req, res) => {
   console.log("i've got a request");
   const userId = req.session.user.id;
   const teamId = req.body.teamId;
   const userEmail = req.session.user.email;
   User.findOne({where: {id: userId }})
   .then( user => {
       if(user)
       {
           user.update({
               teamId: teamId
           })
           .then(result => {
            res.redirect('/teams-page');
           return transporter.sendMail({
                to: userEmail,
                from: 'kiguno1996@gmail.com',
                subject: 'Вы  подали заявку в  команду',
                html: '<h1 Команда вектор ждет тебя!!! </h1>',
                html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Добрый день. Команда "Вектор" хотела бы вас уведомить о том, что вы подали заявку на вступление в команду. В ближайшее время вашу заявку рассмотрит лидер команды и примет решение. На забудьте проверять свой профиль и почту чтобы видеть свой статус. </p>'
            }); 
        })
        .catch( err => {
              
                if(err){
                    console.log(err);
                } else {
                    console.log('Вы успешно подали заявку в команду')
                }
              
           })
       }
   })
   req.session.user.teamId = teamId;
}

exports.postCancelRequest = (req, res) => {
    console.log("i've got a request");
    let userId = req.session.user.id;
    const userEmail = req.session.user.email;
    const deleteId = 0;
    User.findOne({where: {id: userId }})
    .then( user => {
        if(user)
        {
            user.update({
                teamId: deleteId
                
            })
            .then(() => {
                res.redirect('/teams-page');
                return transporter.sendMail({
                     to: userEmail,
                     from: 'kiguno1996@gmail.com',
                     subject: 'Вы отклонили заявку в команду',
                     html: '<h1 Команда вектор ждет тебя!!! </h1>',
                     html: '<p style="text-align: justify; padding: 5%; margin: 0 auto;"> Добрый день. Команда "Вектор" хотела бы уведомить вас о том, что вы являетесь лидером новой команды заявка которой будет рассматриваться. Просим вас сообщить вашим ребятам о том, что они могут вступить в нее или пригласить их сами. </p>'
                 }); 
            })
            .catch(err => {
                if(err)
                {
                    console.log(err);
                } else {
                    console.log('Вы успешно отменили заявку в команду!!')
                }
            })
        }
      req.session.user.teamId = 0;
      console.log("Новая сессия с  нулем " +  req.session.user.teamId );
    })
    
 }