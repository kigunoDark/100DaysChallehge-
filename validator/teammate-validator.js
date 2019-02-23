const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validOfteammate(data) {

    let errors = {};
    
    data.mateSurname= !isEmpty(data.mateSurname) ? data.mateSurname : "";
    data.mateName = !isEmpty(data.mateName) ? data.mateName : "";
    data.mateSecondName = !isEmpty(data.mateSecondName) ? data.mateSecondName : "";
    data.matePosition = !isEmpty(data.matePosition) ? data.matePosition : "";
    data.mateVK = !isEmpty(data.mateVK) ? data.mateVK : "";
    data.mateInstagram = !isEmpty(data.mateInstagram) ? data.mateInstagram: "";
    data.matePhone= !isEmpty(data.matePhone) ? data.matePhone : "";
    data.mateAbout = !isEmpty(data.mateAbout) ? data.mateAbout : "";
    data.mateCrowns = !isEmpty(data.mateCrowns) ? data.mateCrowns: "";
    data.mateHobby= !isEmpty(data.mateHobby) ? data.mateHobby : "";
    data.mateEmail= !isEmpty(data.mateEmail) ? data.mateEmail : "";
    
    if(!Validator.isEmail(data.mateEmail)){
      errors.mateEmail="Email введен не верно";
    }

    if (Validator.isEmpty(data.mateEmail)) {
      errors.mateEmail = "Данное поле обязательно";
    }
  
    if (Validator.isEmpty(data.mateSurname)) {
      errors.mateSurname = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.mateName)) {
      errors.mateName = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.mateSecondName)) {
      errors.mateSecondName = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.matePosition)) {
      errors.matePosition = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.mateVK)) {
      errors.mateVK = "Данное поле обязательно";
    }


    if (Validator.isEmpty(data.mateInstagram )) {
      errors.mateInstagram  = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.matePhone)) {
      errors.matePhone = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.mateAbout)) {
      errors.mateAbout = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.mateCrowns)) {
      errors.mateCrowns = "Данное поле обязательно";
    }

    if (Validator.isEmpty(data.mateHobby)) {
      errors.mateHobby = "Данное поле обязательно";
    }

    if (!Validator.isLength(data.mateAbout, { min: 250 })) {
      errors.mateAbout = "Необходимо написать о себе не менее 250 символов";
    }
    if (!Validator.isLength(data.mateName, { min: 2 })) {
      errors.mateName = "Необходимо написать о себе не менее 250 символов";
    }


    return {
        errors,
        isValid: isEmpty(errors)
      };
}