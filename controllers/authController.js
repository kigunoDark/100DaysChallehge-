exports.getLogin = (req, res) => {
    res.render('./users/landingPage', 
    {
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"admin"
        
    });
};

exports.postLogin = (req, res) => {
    req.isLoggedIn = true;
    res.redirect('/adminPage');
};

