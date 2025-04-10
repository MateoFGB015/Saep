const express = require('express');
const router = express.Router();
const FichaAprendiz = require('../controllers/FichaAprendizController');

router.get('/ver_aprendiz', FichaAprendiz.obtenerAprendizDeFicha);
router.delete('/eliminar_aprendiz',FichaAprendiz.eliminarAprendizDeFicha);