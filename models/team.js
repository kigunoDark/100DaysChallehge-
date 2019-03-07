const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const TeamMate =  sequelize.define('teamMate', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false    
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vk: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instagram: { 
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    about: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    crowns: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    hobby:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    email:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = TeamMate;