const { Router } = require('express');
const NivelController = require('../controllers/NivelController.js');

const router = Router();

router
    .get('/niveis', NivelController.pegaTodosNiveis)
    .get('/niveis/:id', NivelController.pegaNivel)
    .post('/niveis', NivelController.criaNivel)
    .put('/niveis/:id', NivelController.atualizaNivel)
    .delete('/niveis/:id', NivelController.apagaNivel)
    .post('/niveis/:id/restaura', NivelController.restauraNivel)
module.exports = router