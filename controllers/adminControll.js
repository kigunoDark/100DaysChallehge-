const User = require('../models/users');
var moment = require('moment');


exports.getIndex = (req,res, next)  => {

    User.findAll()
    .then(users => {
        res.render("/user/index", {
            users: users,
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
            moment: moment,
            users: users,
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
