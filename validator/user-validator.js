const Validator = require("validator");
const isEmpty = require("is-empty");

// Export our validation function
module.exports = function validOfOneUser(data) {
  let errors = {};

  data.parfio = !isEmpty(data.parfio) ? data.parfio : "";
  data.parUnivercity = !isEmpty(data.parUnivercity) ? data.parUnivercity : "";
  data.parCity = !isEmpty(data.parCity ) ? data.parCity  : "";
  data.parEmail = !isEmpty(data.parEmail) ? data.parEmail : "";
  data.parPhone = !isEmpty(data.parPhone) ? data.parPhone  : "";
  data.parSocial = !isEmpty(data.parSocial) ? data.parSocial : "";
  data.parPosition = !isEmpty(data.parPosition ) ? data.parPosition : "";
  data.parSocityExp = !isEmpty(data.parSocityExp ) ? data.parSocityExp : "";
  data.parEventsExp = !isEmpty(data.parEventsExp) ? data.parEventsExp : "";
  data.parCharacter = !isEmpty(data.parCharacter) ? data.parCharacter : "";
  data.parStrengths = !isEmpty(data.parStrengths) ? data.parStrengths : "";
  data.parWhy= !isEmpty(data.parWhy) ? data.parWhy : "";


  
  if (!Validator.isEmail(data.parEmail)) {
    errors.parEmail = "Email введен не верно";
  }


  if (Validator.isEmpty(data.parfio)) {
    errors.parfio = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parUnivercity)) {
    errors.parUnivercity = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parCity)) {
    errors.parCity = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parEmail)) {
    errors.parEmail = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parPhone)) {
    errors.parPhone = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parSocial)) {
    errors.parSocial = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parPosition)) {
    errors.parPosition = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parSocityExp)) {
    errors.parSocityExp = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parEventsExp)) {
    errors.parEventsExp = "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parCharacter)) {
    errors.parCharacter= "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parStrengths)) {
    errors.parStrengths= "Данное поле обязательно";
  }

  if (Validator.isEmpty(data.parWhy)) {
    errors.parWhy== "Данное поле обязательно";
  }



  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};