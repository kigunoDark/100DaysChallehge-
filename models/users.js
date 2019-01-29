// const db = require('../data/database');


// module.exports = class User{
//     constructor(
//         parFio, parCity, parUnivercity,
//         parEmail, parPhone, parDate, 
//         parSocial, parPosition, parExp,
//         parSocityExp, parEventsExp, parCharacter,
//         parStrengths, parWhy, parSize
//         ){
//         this.parFio = parFio;
//         this.parCity = parCity;
//         this.parUnivercity = parUnivercity;
//         this.parEmail = parEmail;
//         this.parPhone = parPhone;
//         this.parDate = parDate;
//         this.parSocial = parSocial;
//         this.parPosition = parPosition;
//         this.parExp = parExp;
//         this.parSocityExp = parSocityExp;
//         this.parEventsExp = parEventsExp;
//         this.parCharacter = parCharacter;
//         this.parStrengths = parStrengths;
//         this.parWhy = parWhy;
//         this.parSize = parSize;
     
//     }

//     save() {
       
//         return db.execute("insert into users (parFio, parCity, parUnivercity, parEmail, parPhone, parDate, parSocial, parPosition, parExp, parSocityExp, parEventsExp, parCharacter,  parStrengths, parWhy, parSize) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//         [this.parFio,
//          this.parCity,
//          this.parUnivercity,
//          this.parEmail,
//          this.parPhone,
//          this.parDate,
//          this.parSocial,
//          this.parPosition,
//          this.parExp,
//          this.parSocityExp,
//          this.parEventsExp,
//          this.parCharacter,
//          this.parStrengths,
//          this.parWhy,
//          this.parSize]);
        
//     }

//     static deleteByIf(id){

//     }
    
//     static findById(id){
//         db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
//     }
//     static fetchAll() {
//        return db.execute("SELECT * FROM users")
      
//     }
// }

const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    parFio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parCity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parUnivercity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parEmail: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    parPhone: {
        type: Sequelize.STRING,
        allowNull: false
    },
     parDate: {
         type: Sequelize.DATE,
         allowNull: false
     },
     parSocial: {
         type: Sequelize.STRING,
         allowNull: false
     },
     parPosition: {
        type: Sequelize.STRING,
        allowNull: false
     },

     parExp: {
         type: Sequelize.STRING,
         allowNull: false
     },
    parSocityExp: {
        type: Sequelize.STRING,
        allowNull: false
    },
     parEventsExp:{
        type: Sequelize.STRING,
        allowNull: false
    },
     parCharacter:{
        type: Sequelize.STRING,
        allowNull: false
     },
     parStrengths: {
        type: Sequelize.STRING,
        allowNull: false
     },
     parWhy: {
        type: Sequelize.STRING,
        allowNull: false
     },
      parSize: {
          type: Sequelize.STRING,
          allowNull: false
      }
});

module.exports = User;