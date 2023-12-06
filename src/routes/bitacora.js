const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { crearBitacora, getAllBitacora, getBitacorasByTipo } = require('../controllers/BitacoraController');

router.post('/bitacora', [
    check('usuario', 'El campo usuario es obligatorio').not().isEmpty(),
    check('tipo', 'El campo tipo es obligatorio').not().isEmpty(),
    check('descripcion', 'El campo descripcion es obligatorio').not().isEmpty(),
    validarCampos
],crearBitacora);

router.get('/bitacora', getAllBitacora);
router.post('/bitacora/reporte', getBitacorasByTipo);


module.exports = router;