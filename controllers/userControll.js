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

  const user = new User(
    parFio, parCity, parUnivercity,
    parEmail, parPhone, parDate,
    parSocial, parPosition, parExp,
    parSocityExp, parEventsExp, parCharacter,
    parStrengths, parWhy, parSize
  )

  user.save()
  .then(() => {
      res.redirect('/');
  })
  .catch(err => {
      console.log(err);
  })
} 


exports.postNewUser = (req, res) => {

    // const { errors, isValid } = validOfOneUser(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    //  }
     
    // const parFio =  req.body.parFio;
    const parUnivercity = req.body.parUnivercity;
    // const parCity = req.body.parCity;
    // const parEmail = req.body.parEmail;
    // const parPhone = req.body.parPhone;
    // const parDate = req.body.parDate;
    // const parSocial = req.body.parSocial;
    // const parPosition = req.body.parPosition;
    // const parExp = req.body.parExp;
    // const parSocityExp = req.body.parSocityExp;
    // const parEventsExp = req.body.parEventsExp;
    // const parCharacter = req.body.parCharacter;
    // const parStrengths = req.body.parStrengths;
    // const parWhy = req.body.parWhy;
    // const parSize = req.body.parSize

    // const user = new User(
    //     parFio, parUnivercity, parCity,
    //     parEmail,parPhone, parDate,
    //     parSocial, parPosition, parExp,
    //     parSocityExp, parEventsExp, parCharacter,
    //     parStrengths, parWhy, parSize
    //     );

    // const user = new User(null, parUnivercity);
    // user.save()
    // .then(() =>{
    //     res.redirect('/');
    // })
    // .catch(err => console.log(err));
   
}
