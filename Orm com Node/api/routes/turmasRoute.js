const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()
router
 .get('/turmas', TurmaController.pegaTodasTurmas)
 .get('/turmas/:id', TurmaController.pegaTurma)
 .post('/turmas', TurmaController.criaTurma)
 .put('/turmas/:id', TurmaController.atualizaTurma)
 .delete('/turmas/:id', TurmaController.apagaTurma)
 .post('/turmas/:id/restaura', TurmaController.restauraTurma)
module.exports = router