const TeamMate = require('../models/team');

exports.getLogin = (req, res) => {
    console.log(req.session.isLoggedIn);
    TeamMate.findAll()
    .then(teams => {
    res.render('./users/landingPage',
     { 
        teams: teams,
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"admin",
        isAuthenticated: false

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
    req.session.isLoggedIn = true;
    res.redirect('/admin/adminPage');   
};

