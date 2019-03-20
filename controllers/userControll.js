const User = require('../models/users');
const Acceptedd = require('../models/accepted-team');
const sizeOf = require('image-size');
const moment = require('moment');
const {validationResult } = require('express-validator/check');

exports.getLanding = (req, res) => {
       let message = req.flash('error');
    if(message.length > 0)
    {
        messege = message[0];
    } else {
        message = null;
    }

   Acceptedd.findAll()
    .then(teams => {
    res.render('./users/landingPage',
     { 
        teams: teams,
        pageTitle: "ВекторСКФО",
        pageTipe:"users",
        path: '/',
        errorMessage: message,
        validationErrors:[]
        
    });
    })
    .catch(err => {
        console.log(err);
    })

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
    const parPhoto = req.file;

    const errors = validationResult(req);

    if(!parPhoto)
    {
        console.log(" you didn't get the data");
        res.redirect('/');
    }



    const imageUrl = parPhoto.path;
    var dimensions = sizeOf(imageUrl);
    if(dimensions.height != dimensions.width || dimensions.height > 800 || dimensions.width > 800 )
    {
        console.log("Ширина и высота изображения должны быть одинаковы и не меньше 800px");
        res.redirect('/');
    }
    if(!errors.isEmpty()){
        console.log('Произошла ошибка и ее должно вывести');
        Acceptedd.findAll()
        .then(teams => {
        return  res.status(422).render('./users/landingPage',{
            teams: teams,
            pageTitle: "ВекторСКФО",
            pageTipe: "adminIn",
            editing: false,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
       });
    })
    .catch(err => {
        console.log(err);
    })
    }
    
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
        parSize: parSize,
        parPhoto: imageUrl
        
    })
    .then(result => {
        console.log('Created User');
        res.redirect('/')
    }).catch( err => {
        console.log(err);
    });
} 


