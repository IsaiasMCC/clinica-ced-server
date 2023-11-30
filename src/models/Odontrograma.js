const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { Paciente } = require('./Paciente');

const Odontograma = sequelize.define('Odontograma', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
   
});

Paciente.hasMany(Odontograma, {
    // fo
    // reignKey: 'userId'
});

Odontograma.belongsTo(Paciente);

module.exports = {
    Odontograma
}