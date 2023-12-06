const { sequelize } = require("../database/connection");
const { DataTypes } = require("sequelize");

const Bitacora = sequelize.define("Bitacora", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.STRING,
  },
  hora: {
    type: DataTypes.STRING,
  },
  usuario: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  }
});

module.exports = {
    Bitacora
}