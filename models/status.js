const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Status =  sequelize.define('statuses', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    s_type:{
        type: Sequelize.TEXT,
        allowNull: true
    }
    
})

module.exports = Status;