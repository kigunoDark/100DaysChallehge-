const User = require('../models/users');

exports.getIndex = (req,res, next)  => {
    User.findAll()
    .then(users => {
        res.render("/user/index", {
            users: users,
            pageTitle: "Searching",
            path: "/user/index"
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getAllUsers = (req, res) => {
    
    User.findAll()
    .then(users => {
        res.render("./admin/adminPage", {
            users: users,
            pageTitle: "Страница администратора",
            pageTipe: "adminIn"
        })
    })
    .catch(err => {
        console.log(err);
    })
};


