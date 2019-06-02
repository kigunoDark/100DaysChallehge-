const TeamMate = require('../models/team');

const bcrypt = require('bcryptjs');
const User = require('../models/users');


exports.getUserLogin = (req, res)  => {
 
if(!req.session.isLoggedIn)
{   res.render('./admin/mobile-login',
    {   name: '',
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"mobileLogin",
        isAuthenticated: req.isLoggedIn,
        userId: req.id
    })

} else {
    res.redirect('/profile');
}
    
}

exports.postLogin = (req, res) => {
    const email= req.body.adminEmail;
    const password = req.body.adminPassword;  

    User.findOne({where: {email: email }})
    .then(user=> {
        if(!user)
        {
            req.flash('error', 'Проверьте email или пароль.');
            return res.redirect('/user-login');
        }
        bcrypt
        .compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user; 
           
               return req.session.save(err=>
                {
                    console.log(err);
                    return res.redirect('/profile');
                })
              
            } else {
              res.redirect('/profile');
            }   
        })
        .catch(err => {
            console.log(err);
            res.redirect('/profile');
        });
    })
}
        


exports.postLogout  = (req, res, next) => {
        req.session.destroy( err => {
            console.log(err);
            res.redirect('/user-login');
        });
}

