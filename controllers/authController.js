const TeamMate = require('../models/team');

exports.getLogin = (req, res) => {
 
    TeamMate.findAll()
    .then(teams => {
    res.render('./users/landingPage',
     { 
        teams: teams,
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"admin",
        isAuthenticated: req.isLoggedIn

    });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getMobileLogin = (req, res)  => {
   res.render('./admin/mobileLogin',
    {
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"mobileLogin",
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    res.setHeader('Set-Cookie', 'loogedIn = true');
    res.redirect('/adminPage');
};

