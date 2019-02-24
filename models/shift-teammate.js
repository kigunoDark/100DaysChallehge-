const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const ShiftTeammate = sequelize.define('shiftTeammate', {
    
    id:{
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER

})

module.exports = ShiftTeammate;