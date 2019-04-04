const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Team =  sequelize.define('teams', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false    
    },
    t_name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    t_social: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    t_exp: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    t_str: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    t_imp: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    t_why:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    t_size: {
        type:Sequelize.TEXT,
        allowNull:false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Team;