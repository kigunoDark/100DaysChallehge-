const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
'data',
'users.json'
);

// const users = [];
const getUsersFromFile = cb => {

    fs.readFile(p,(err, fileContent) =>{
        if(err){
            return cb ([]);
        } else {
            cb(JSON.parse(fileContent));
        }
        
    });
}



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
        getUsersFromFile(users => {
            users.push(this);
            fs.writeFile(p, JSON.stringify(users), (err) =>{
                console.log(err);
            });
        });
        // users.push(this);
       
        // fs.readFile(p, (err, fileContent) => {    
        // });
      }

    static fetchAll(cb) {
        getUsersFromFile(cb);
        // return users;
    }
}