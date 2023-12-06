const shortid = require("shortid");
const { Bitacora } = require("../models/Bitacora");
const { Op } = require("sequelize");

const crearBitacora = async (req, res) => {
  const { usuario, tipo, descripcion } = req.body;

  const fechaHoraActual = new Date();
  const fecha = fechaHoraActual.toLocaleDateString();
  const newBitacora = Bitacora.build({
    id: shortid.generate(),
    fecha,
    hora: fechaHoraActual.toLocaleTimeString(),
    usuario,
    tipo,
    descripcion,
  });

  const bitacora = await newBitacora.save();

  return res.status(200).json({ success: true, bitacora });
};

const getAllBitacora = async (req, res) => {
  const bitacoras = await Bitacora.findAll({ order: [["createdAt", "DESC"]] });

  return res.status(200).json({ success: true, bitacoras });
};

const getBitacorasByTipo = async (req, res) => {
  const { fechaInicial, fechaFinal, tipo, usuario } = req.body;
  const fechaInicio = new Date(fechaInicial);
  const fechaFin = new Date(fechaFinal);
  // Realizar la consulta con todas las condiciones
  const bitacoras = await Bitacora.findAll({
    where: {
      createdAt: { [Op.between]: [fechaInicio, fechaFin] },
    },
  });

  return res.status(200).json({ success: true, bitacoras });
};

module.exports = {
  crearBitacora,
  getAllBitacora,
  getBitacorasByTipo,
};
