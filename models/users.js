const fs = require('fs');
const path = require('path');

const p= path.join(path.dirname(process.mainModule.filename),
'data',
'users.json'
);

const getUersFormFile = cd => {
    fs.readFile(p,(err, fileContent)=>{
        if(err){
            return cd ([]);
        } else {
            cd(JSON.parse(fileContent));
        }

    });
}


module.exports = class User{
    constructor(parUniversity
        // parUniversity, parCity, parEmail, 
        // parPhone, parDate, parSocial, 
        // parPosition, parExp, parSocityExp,
        // parEventsExp, parCharacter, parStrengths,
        // parWhy, parSize
        ){
        this.parUniversity = parUniversity;
        // this.parCity = parCity;
        // this.parEmail = parEmail;
        // this.parPhone = parPhone;
        // this.parDate = parDate;
        // this.parSocial = parSocial; 
        // this.parPosition = parPosition;
        // this.parExp = parExp;
        // this.parSocityExp = parSocityExp;
        // this.parEventsExp = parEventsExp;
        // this.parCharacter = parCharacter;
        // this.parStrengths = parStrengths;
        // this.parWhy = parWhy;
        // this.parSize =  parSize;
    }

    save(){
        getUersFormFile(users => {
            users.push(this);
            fs.writeFile(p, JSON.stringify(users),(err) =>{
                console.log(err);
            });
        });
    }

    static fetchAll(cd){
        getUersFormFile(cd);
    }
}