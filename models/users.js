
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
      },
      parPhoto: {
        type: Sequelize.STRING,
        allowNull: false
     }
});

module.exports = User;