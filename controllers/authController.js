exports.getLogin = (req, res) => {
    res.render('./users/landingPage', 
    {
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe:"admin",
        isAuthenticated: req.isLoggedIn
        
    });
};

exports.getMobileLogin = (req, res)  => {
    res.render('./admin/mobileLogin',
    {
        pageTitle: "ВЕКТОР АДМИН",
        pageTipe: "admin",
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    res.setHeader('Set-Cookie', 'loogedIn = true');
    res.redirect('/adminPage');
};

