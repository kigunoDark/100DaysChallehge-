const TeamMate = require('../models/team');
const Admin = require('../models/admin');

exports.getLogin = (req, res) => {
    
    TeamMate.findAll()
    .then(teams => {
    res.render('./users/landingPage',
     { 
        teams: teams,
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"admin",
        isAuthenticated: req.session.isLoggedIn

    });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getMobileLogin = (req, res)  => {
   res.render('./admin/mobile-login',
    {
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"mobileLogin",
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    Admin.findById(1)
    .then(admin => 
    {
    req.session.isLoggedIn = true;
    req.session.admin = admin;
    res.redirect('/admin/adminPage'); 
    })
        .catch(err => console.log(err));
    
};

