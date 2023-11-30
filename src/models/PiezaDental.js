const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { Odontograma } = require('./Odontrograma');

const PiezaDental = sequelize.define('Pieza_dental', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
    }
   
});

Odontograma.hasMany(PiezaDental, {

});

PiezaDental.belongsTo(Odontograma);

module.exports = {
    PiezaDental
}