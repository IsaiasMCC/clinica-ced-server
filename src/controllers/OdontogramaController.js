const { request, response } = require("express");
const shortid = require("shortid");
const { Paciente } = require("../models/Paciente");
const { Odontograma } = require("../models/Odontrograma");
const { PiezaDental } = require("../models/PiezaDental");
const { TipoPieza } = require("../models/TipoPieza");

const crearOdontograma = async (req, res) => {
  const { piezas, odontologo_id, paciente_id } = req.body;

//   let odontologo = await Odontologo.findAll({
//     where: { id: odontologo_id },
//   });

//   if (!odontologo) {
//     return res
//       .status(400)
//       .json({ success: false, message: "odontologo no encontrado" });
//   }

  let paciente = await Paciente.findAll({ where: { id: paciente_id } });
  
  if (!(paciente.length > 0)) {
    return res
      .status(400)
      .json({ success: false, message: "paciente no encontrado" });
  }


  const nuevoOdontograma = Odontograma.build({
    id: shortid.generate(),
    PacienteId: paciente_id,
  });

  const odontograma = await nuevoOdontograma.save();

  piezas.forEach(async (pieza) => {
    const piezanueva = PiezaDental.build({
      id: shortid.generate(),
      nombre: pieza.nombre,
      numero: pieza.numero,
      OdontogramaId: odontograma.id,
    });

    piezanew = await piezanueva.save();

    let detalles = pieza.tipo_piezas;
    detalles.forEach(async (tipo) => {
      const tiponuevo = TipoPieza.build({
        id: shortid.generate(),
        nombre: tipo.nombre,
        estado: true,
        PiezaDentalId: piezanew.id,
      });

      tipooo = await tiponuevo.save();
    });
  });

  return res.json({ success: true, message: "odontograma creado" });
};


module.exports = {
  crearOdontograma,
};
