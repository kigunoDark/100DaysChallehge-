const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Status =  sequelize.define('statuses', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = Status;