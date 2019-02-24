const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Shift = sequelize.define('shift', {
    
    id:{
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Shift;