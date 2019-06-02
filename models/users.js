
const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
        
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    secondname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    univercity: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    date: {
         type: Sequelize.DATE,
         allowNull: true,
    
     },
    social: {
         type: Sequelize.STRING,
         allowNull: true,
         defaultValue: 'NULL'
     },
    position: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
     },

    exp: {
         type: Sequelize.STRING,
         allowNull: true,
         defaultValue: 'NULL'
     },
    socityExp: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    eventsExp:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    character:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
     },
    strengths: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
     },
    why: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    size: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
    },
    password: {
         type: Sequelize.TEXT,
         allowNull: true,
         defaultValue: 'NULL'
     },    
     teamStatus:{ 
         type: Sequelize.TEXT,
         allowNull: true,
         defaultValue: 'NULL'
    },
    eventStatus:{
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'NULL'
    },
    s_type:{
        type: Sequelize.TEXT,
        allowNull: true
    }
    

});

module.exports = User;