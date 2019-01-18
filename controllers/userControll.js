const User = require('../models/users');

exports.getLanding = (req, res) => {
    res.render('./users/landingPage',
     { 
        pageTitle: "ВекторСКФО",
        pageTipe:"users"
    });
};

exports.postNewUser = (req, res)=>{

    const parUniversity = req.body.paruniversity;
    // const parCity = req.bod.parCity;
    // const parEmail = req.boyd.parEmail;
    // const parPhone = req.body.parPhone;
    // const parDate  = req.body.parDate;
    // const parSocial = req.body.parSocial;
    // const parPosition = req.body.parPosition;
    // const parExp = req.body.parExp;
    // const parSocityExp = req.body.parSocityExp;
    // const parEventsExp = req.body.parEventsExp;
    // const parCharacter = req.body.parCharacter;
    // const parStrengths = req.body.parStrengths;
    // const parWhy = req.body.parWhy;
    // const parSize = req.body.parSize;

    const user = new User(parUniversity);
        //  parUniversity, parCity, parEmail,
        //  parPhone, parDate, parSocial,
        //  parPosition, parExp, parSocityExp,
        //  parEventsExp, parCharacter,parStrengths,
        //  parWhy, parSize);
    user.save();
    res.redirect('/');
};
