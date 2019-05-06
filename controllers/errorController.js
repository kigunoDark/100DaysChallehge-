exports.get404 = (req, res) => {
    const name = req.session.name;
    const roleId = req.session.user.roleId;
    
    res.status(404).render('404',{
        roleId: roleId,
        name: name,
        pageTitle: "Страница не найдена",
        path: '/404',
        pageTipe: "error",
    });
}