const User = require('../models/users');


exports.getAdminLogin = (req, res) => {
    res.render('./users/landingPage', 
    {
        pageTitle: "Вектор амдин",
        pageTipe:"admin"
        
    });
};

exports.getAllUsers = (req, res) => {
    User.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('./admin/adminPage',{
            users: rows,
            pageTitle: "Страница администратора",
            pageTipe: "adminIn"
        });
    })
    .catch(err => console.log(err));
    
    
};


