const Router = require('express');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router();

router
    .get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegaMatricula)
    .get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculasTurma)
    .get('/pessoas/matricula/lotada', MatriculaController.pegaTurmasLotadas)
    .post('/pessoas/:estudanteId/matricula', MatriculaController.criaMatricula)
    .put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizaMatricula)
    .delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.apagaMatricula)
    .post('/pessoas/:estudante_id/matricula/:matricula_id', MatriculaController.restauraMatricula)

module.exports = router;