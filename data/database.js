const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdatabase', 'root', '1995op1995', 
{
    dialect: 'mysql',
    host:'localhost'
});

module.exports = sequelize;