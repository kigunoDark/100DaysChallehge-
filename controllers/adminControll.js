const User = require('../models/users');
exports.getAdminLogin = (req, res) => {
    res.render('./users/landingPage', 
    {
        pageTitle: "Вектор Admin",
        pageTipe:"admin"
        
    });
};

exports.getAllUsers = (req, res) => {
    User.fetchAll(users => {
        res.render('./admin/adminPage',{
            users: users,
            pageTitle: "Admin page",
            pageTipe: "adminIn"
        });
    })
    
};


