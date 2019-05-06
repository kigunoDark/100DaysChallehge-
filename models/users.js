
const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    univercity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
         type: Sequelize.DATE,
         allowNull: false
     },
    social: {
         type: Sequelize.STRING,
         allowNull: false
     },
    position: {
        type: Sequelize.STRING,
        allowNull: false
     },

    exp: {
         type: Sequelize.STRING,
         allowNull: false
     },
    socityExp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    eventsExp:{
        type: Sequelize.STRING,
        allowNull: false
    },
    character:{
        type: Sequelize.STRING,
        allowNull: false
     },
    strengths: {
        type: Sequelize.STRING,
        allowNull: false
     },
    why: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
          type: Sequelize.STRING,
          allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
         type: Sequelize.TEXT,
         allowNull: false
     },    
     teamStatus:{ 
         type: Sequelize.TEXT,
         allowNull: true
    },
    eventStatus:{
        type: Sequelize.TEXT,
        allowNull: true
    }

});

module.exports = User;