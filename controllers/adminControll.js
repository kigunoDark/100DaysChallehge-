const User = require('../models/users');
const TeamMate = require('../models/team');
var moment = require('moment');


exports.getIndex = (req,res, next)  => {
    const id = req.params.id;
    User.findById(id)
    .then(user => {
        res.render("/user/index", {
            users: user,
            pageTitle: "Searching",
            path: "/user/index",
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
    
    res.render('./admin/adminTeam',
    {
        pageTitle: "Команда Вектор",
        pageTipe: 'adminIn'
    })
}

exports.addNewTeamMate = (req, res) => {
    
   const mateSurname = req.body.mateSurname;
   const mateName = req.body.mateName;
   const mateSecondName = req.body.mateSecondName;
   const matePosition = req.body.matePosition;
   const mateVK = req.body.mateVK;
   const mateInstagram = req.body.mateInstagram;

   TeamMate.create({
        name: mateName,
        secondName: mateSecondName,
        surname: mateSurname,
        position: matePosition,
        instagram: mateInstagram,
        vk: mateVK
    })
    .then(result => {
        console.log('Created User');
        res.redirect('/')
    }).catch( err => {
        console.log(err);
    });
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
