const { sequelize } = require('../database/connection');
const { DataTypes } = require('sequelize');
const { PiezaDental } = require('./PiezaDental');

const TipoPieza = sequelize.define('Tipo_pieza', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    tratamiento: {
        type: DataTypes.STRING
    }
   
});

PiezaDental.hasMany(TipoPieza, {
    
});

TipoPieza.belongsTo(PiezaDental);

module.exports = {
    TipoPieza
}