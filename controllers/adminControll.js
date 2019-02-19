const User = require('../models/users');
const TeamMate = require('../models/team');
const path = require('path');

const moment = require('moment');


// Init multer storege
exports.editTeamMate = (req,res, next) => {
   const teamId = req.params.id;
   TeamMate.findById(teamId)
   .then(teammate => {

    if(!teammate){
        res.redirect('/');
    }
    res.render('./admin/editTeam',
    { 
       
       pageTitle: "Профиль сотрудника",
       pageTipe: 'adminIn',
       teammmate: teammate,
       isAuthenticated: req.isLoggedIn

   })
   })
   .catch(err => {
       console.log(err);
   });
  

}


exports.getUser = (req,res, next)  => {
    const id = req.params.id;

    User.findById(id)
    .then(user => {
        if(!user){
            res.redirect('/');
        }
        res.render("./admin/userDetails", {
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
        res.render("./admin/adminPar", {
            users: users,
            moment: moment,
            pageTitle: "Участники без команды",
            pageTipe: "adminIn",
            isAuthenticated: req.isLoggedIn
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getAdminPage = (req,res) => {
        res.render('./admin/adminPage',{
            pageTitle: "Страница администратора",
            pageTipe: "adminIn",
        })
}

// we also need a post request for and adminTeam
exports.getAdminTeam = (req, res) => {
    TeamMate.findAll()
    .then(teams => {
    res.render('./admin/adminTeam',
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

exports.addNewTeamMate = (req, res) => {
    
   const mateSurname = req.body.mateSurname;
   const mateName = req.body.mateName;
   const mateSecondName = req.body.mateSecondName;
   const matePosition = req.body.matePosition;
   const mateVK = req.body.mateVK;
   const mateInstagram = req.body.mateInstagram;
   const matePhone = req.body.matePhone;

   TeamMate.create({
        name: mateName,
        secondName: mateSecondName,
        surname: mateSurname,
        position: matePosition,
        instagram: mateInstagram,
        vk: mateVK,
        phone: matePhone
      
    })
    .then(result => {
        console.log('Created User');
        res.redirect('/adminTeam')
    }).catch( err => {
        console.log(err);
    });
} 

exports.postDeleteTeamMate = (req, res) => {
    const id = req.body.teamMateId;
    TeamMate.findById(id)
    .then(team => {
        return team.destroy();
    })
    .then(result => {
        console.log("DESTROYED TEAMMATE");
        res.redirect('/adminTeam');
    })  
}

exports.getAdminGroup = (req, res) =>{
    User.findAll()
    .then(users => {
    res.render('./admin/adminGroup', {
        users: users,
        pageTitle: "Команды участников",
        pageTipe: 'adminIn'
    })
})
    .catch(err => {
        console.log(err);
    })
}
