const User = require('../models/users');
// const validOfOneUser = require('../validator/user-validator');

exports.getLanding = (req, res) => {
    res.render('./users/landingPage',
     { 
        pageTitle: "ВекторСКФО",
        pageTipe:"users",
        path: '/'
    });
}

exports.getTestPage = (req, res ) => {
    res.render('./users/testPage', {
            pageTitle: "TEstPage",
            pageTipe: "test",
            path: '/testpage'
    });
}

exports.addNewUser = (req, res) => {
    
    const parFio = req.body.parFio;
    const parCity = req.body.parCity;
    const parUnivercity = req.body.parUnivercity;
    const parEmail = req.body.parEmail;
    const parPhone = req.body.parPhone;
    const parDate = req.body.parDate;
    const parSocial = req.body.parSocial;
    const parPosition = req.body.parPosition;
    const parExp = req.body.parExp;
    const parSocityExp = req.body.parSocityExp;
    const parEventsExp = req.body.parEventsExp;
    const parCharacter = req.body.parCharacter;
    const parStrengths = req.body.parStrengths;
    const parWhy = req.body.parWhy;
    const parSize = req.body.parSize;

    User.create({
        parFio: parFio,
        parCity: parCity,
        parUnivercity: parUnivercity,
        parEmail: parEmail,
        parPhone: parPhone,
        parDate: parDate,
        parSocial: parSocial,
        parPosition: parPosition,
        parExp: parExp,
        parSocityExp: parSocityExp,
        parEventsExp: parEventsExp,
        parCharacter: parCharacter,
        parStrengths: parStrengths,
        parWhy: parWhy,
        parSize: parSize
    })
    .then(result => {
        console.log('Created User');
        res.redirect('/')
    }).catch( err => {
        console.log(err);
    });
} 


