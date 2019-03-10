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
        errorMessage: req.flash('error')
    });
    })
    .catch(err => {
        console.log(err);
    })
}

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
    const password = req.body.adminPassword;  

    Admin.findOne({where: {email: email }})
    .then(admin => {

        if(!admin)
        {
            req.flash('error', 'Проверьте email или пароль.');
            return res.redirect('/login');
        }

        bcrypt
        .compare(password, admin.password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.admin = admin;
               return req.session.save(err=>
                {
                    console.log(err);
                    return res.redirect('/admin/adminPage');
                })
              
            }
            
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    })
}
        


exports.postLogout  = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

exports.getNewPassword = (req, res, next) => {

}