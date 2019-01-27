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
        db.execute('INSERT INTO (parUnivercity, parCity, parEmail, parPhone, parDate, parSocial, parPosition, parExp, parSocityExp, parEventsExp, parCharacter, parStrengths, parWhy, parSize , parFio) valuer (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.parUnivercity,
             this.parCity,
             this.parEmail,
             this.parPhone,
             this.parDate,
             this.parSocia,
             this.parPosition,
             this.parExp,
             this.parSocityExp,
             this.parEventsExp,
             this.parCharacter,
             this.parStrengths,
             this.parWhy,
             this.parSize,
             this.parFio]
             
        );
        
    }

    static deleteByIf(id){

    }
    
    static findById(id){

    }
    static fetchAll() {
       return db.execute("SELECT * FROM users")
      
    }
}