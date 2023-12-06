const { request, response } = require("express");
const shortid = require("shortid");
const { Paciente } = require("../models/Paciente");
const { Odontograma } = require("../models/Odontrograma");
const { PiezaDental } = require("../models/PiezaDental");
const { TipoPieza } = require("../models/TipoPieza");

const crearOdontograma = async (req, res) => {
  const { piezas, odontologo_id, paciente_id, tratamiento } = req.body;

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
        tratamiento,
        PiezaDentalId: piezanew.id,
      });

      tipooo = await tiponuevo.save();
    });
  });

  return res.json({ success: true, message: "odontograma creado" });
};

const getOdontogramaByPaciente = async (req, res) => {
  const { paciente_id } = req.params;
  
  let paciente = await Paciente.findAll({ where: { id: paciente_id } });
  
  if (!(paciente.length > 0)) {
    return res
      .status(400)
      .json({ success: false, message: "paciente no encontrado" });
  }

  let odontograma = await Odontograma.findAll( { where: { PacienteId: paciente_id }, include: Paciente });
  let detalles = [];
  let paciente_info = "";
  if( odontograma.length > 0) {
    for (let index = 0; index < odontograma.length; index++) {
      const element = odontograma[index];
      let detall = await PiezaDental.findAll({ where: { OdontogramaId: element.id }, include: TipoPieza });
      detalles.push(detall);
    }
    paciente_info = odontograma[0].Paciente.nombre +" "+ odontograma[0].Paciente.apellido;
  }
  

  return res.status(200).json({ success: true, detalles, paciente: paciente_info } );
};


module.exports = {
  crearOdontograma,
  getOdontogramaByPaciente
};
