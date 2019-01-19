exports.getAdminLogin = (req, res) => {
    res.render('./users/landingPage', 
    {
        pageTitle: "Вектор Admin",
        pageTipe:"admin"
        
    });
};

exports.getAdminPage = (req, res) => {
    res.render('./admin/adminPage',{
        pageTitle: "Admin page",
        pageTipe: "adminIn"
    });
    
}
