const User = require('../models/users');
const TeamMate = require('../models/team');
const path = require('path');
const moment = require('moment');
const validatorOfTeammate = require('../validator/teammate-validator');


// Init multer storege
exports.getTeammate = (req,res, next) => {
   const teamId = req.params.id;
   TeamMate.findById(teamId)
   .then(teammate => {
    res.render('./admin/teammate-details',
    { 
       pageTitle: "Профиль сотрудника",
       pageTipe: 'adminIn',
       teammate: teammate,
       isAuthenticated: req.isLoggedIn
   })
   })
   .catch(err => {
       console.log(err);
   });
}
exports.getEditTeammate = (req, res, next) => {
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
            isAuthenticated: req.isLoggedIn
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
       return teammate.save();
   })
   .then(retult =>{
       console.log('Updated product');
       res.redirect('/admin/adminTeam');
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
            path: "/admin/userDetails",
            isAuthenticated: req.isLoggedIn
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
            pageTipe: "adminIn",
            isAuthenticated: isLoggedIn
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getAdminPage = (req,res) => {
    

        res.render('./admin/admin-page',{
            pageTitle: "Страница администратора",
            pageTipe: "adminIn",
            isAuthenticated: req.isLoggedIn
        })
}

// we also need a post request for and adminTeam
exports.getAdminTeam = (req, res) => {
    TeamMate.findAll()
    .then(teams => {
    res.render('./admin/admin-team',
     { 
        teams: teams,
        pageTitle: "Команда Вектор",
        pageTipe: 'adminIn',
        isAuthenticated: req.isLoggedIn

    });
    })
    .catch(err => {
        console.log(err);
    })
  
}

exports.getAddTeammate = (req,res) => {
    
    res.render('./admin/edit-teammate',{
        pageTitle: "Добавление сотрудника",
        pageTipe: "adminIn",
        editing: false,
        isAuthenticated: req.isLoggedIn
    });
}

exports.addNewTeamMate = (req, res) => {
    const { errors, isValid } =validatorOfTeammate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
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
        email: mateEmail
    })
    .then(result => {
        console.log('Created User');
        res.redirect('/admin/adminTeam')
    }).catch( err => {
        console.log(err);
    });
} 

exports.postDeleteTeamMate = (req, res) => {

    const id = req.body.teamMateId;
    console.log(id);

    TeamMate.findById(id)
    .then(team => {
        return team.destroy();
    })
    .then(result => {
        console.log("DESTROYED TEAMMATE");
        res.redirect('/admin/adminTeam');
    })  
}

exports.getAdminGroup = (req, res) =>{
    User.findAll()
    .then(users => {
    res.render('./admin/admin-group', {
        users: users,
        pageTitle: "Команды участников",
        pageTipe: 'adminIn',
        isAuthenticated: req.isLoggedIn
    })
})
    .catch(err => {
        console.log(err);
    })
}
