const db = require('../data/database');


module.exports = class User{
    constructor(
        parUnivercity, parCity ,parEmail,
        parPhone, parDate, parSocial,
        parPosition, parExp, parSocityExp,
        parEventsExp, parCharacter, parStrengths,
        parWhy, parSize, parFio
        ){
        this.parUnivercity = parUnivercity;
        this.parCity = parCity;
        this.parEmail = parEmail;
        this.parPhone = parPhone;
        this.parDate = parDate;
        this.parSocial = parSocial;
        this.parPosition = parPosition;
        this.parExp = parExp;
        this.parSocityExp = parSocityExp;
        this.parEventsExp = parEventsExp;
        this.parCharacter = parCharacter;
        this.parStrengths = parStrengths;
        this.parWhy = parWhy;
        this.parSize = parSize;
        this.parFio = parFio;
    }

    save() {
       
        
      }

    static deleteByIf(id){

    }
    
    static findById(id){

    }
    static fetchAll() {
       return db.execute("SELECT * FROM users")
      
    }
}