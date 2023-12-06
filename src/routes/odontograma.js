const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { crearOdontograma, getOdontogramaByPaciente } = require('../controllers/OdontogramaController');

router.post('/odontograma', [
    check('piezas', 'El campo piezas es obligatorio').isArray(),
    check('paciente_id', 'El campo paciente_id es obligatorio').not().isEmpty(),
    check('tratamiento', 'El campo tratamiento es obligatorio').not().isEmpty(),
    validarCampos
],crearOdontograma);

router.get('/odontograma/:paciente_id', getOdontogramaByPaciente);


module.exports = router;