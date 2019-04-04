exports.get404 = (req, res) => {
    const name = req.session.name;
    res.status(404).render('404',{
        name: name,
        pageTitle: "Страница не найдена",
        path: '/404',
        pageTipe: "error",
    });
}