const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Role = sequelize.define('role',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.TEXT,
        allowNull: false
    }

})


module.exports = Role;