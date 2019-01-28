const db = require('../data/database');


module.exports = class User{
    constructor(
        parFio, parCity, parUnivercity,
        parEmail, parPhone, parDate, 
        parSocial, parPosition, parExp,
        parSocityExp, parEventsExp, parCharacter,
        parStrengths, parWhy, parSize
        ){
        this.parFio = parFio;
        this.parCity = parCity;
        this.parUnivercity = parUnivercity;
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
     
    }

    save() {
       
        return db.execute("insert into users (parFio, parCity, parUnivercity, parEmail, parPhone, parDate, parSocial, parPosition, parExp, parSocityExp, parEventsExp, parCharacter,  parStrengths, parWhy, parSize) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [this.parFio,
         this.parCity,
         this.parUnivercity,
         this.parEmail,
         this.parPhone,
         this.parDate,
         this.parSocial,
         this.parPosition,
         this.parExp,
         this.parSocityExp,
         this.parEventsExp,
         this.parCharacter,
         this.parStrengths,
         this.parWhy,
         this.parSize]);
        
    }

    static deleteByIf(id){

    }
    
    static findById(id){

    }
    static fetchAll() {
       return db.execute("SELECT * FROM users")
      
    }
}