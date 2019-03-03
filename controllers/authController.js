const TeamMate = require('../models/team');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

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

    const email= req.body.adminEmail;
    console.log(email);
    const password = req.body.adminPassword;
    console.log(password);
    Admin.findOne({where: {email: email}})
    .then(admin => 
    {
        if(!admin)
        {
            return res.redirect('/login');
        }
    
        // bcrypt
        // .compare(password, admin.password)
        // .then(doMatch => {
            if(password === admin.password){
                req.session.isLoggedIn = true;
                req.session.admin = admin;
            return req.session.save(err=>{
                console.log(err);
                return res.redirect('/admin/adminPage')
            });
        }
        console.log('You are not able to login');
        res.redirect('/login')
    })
        .catch(err=> {
            console.log(err);
            res.redirect('/login');
        })
        .catch(err => console.log(err));
    };
        
    


exports.postLogout  = (req, res, next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/login');
    });
}
