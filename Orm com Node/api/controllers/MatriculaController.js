const Sequelize = require("sequelize");
const { MatriculasServices } = require('../services');
const matriculasServices = new MatriculasServices();

class MatriculaController{
    //http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
    static async pegaMatricula(req, res){
        const { matriculaId, estudanteId } = req.params;
        try{
            const matricula = await matriculasServices.pegaUmRegistro({ id: Number(matriculaId), estudante_id: Number(estudanteId) }) // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(matricula);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaMatricula(req, res){
        const { estudanteId } = req.params;
        const dadosAtualizados = { ...req.body, estudante_id: Number(estudanteId) };
        try{
            const novaMatricula = await matriculasServices.criaRegistro(dadosAtualizados);
            return res.status(200).json(novaMatricula);
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        const dadosAtualizados = req.body;
        try{
            await matriculasServices.atualizaRegistro(dadosAtualizados, { id: Number(matriculaId), estudante_id: Number(estudanteId)} );
            const matriculaAtualizada = await matriculasServices.pegaUmRegistro({ id: Number(matriculaId), estudante_id: Number(estudanteId) })
            return res.status(200).json(matriculaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            await matriculasServices.apagaRegistro({ id: Number(matriculaId), estudante_id: Number(estudanteId) })
            return res.status(200).json({mensagem: `Id com ${matriculaId} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            await matriculasServices.restauraRegistro({id: Number(matriculaId), estudante_id: Number(estudanteId)})
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculasTurma(req, res){
        const {turmaId} = req.params
        try{
            const todasMatriculas = await matriculasServices.encontraEContaRegistros({turma_id: Number(turmaId), status: 'confirmado'}, { limit: 20, order: [['estudante_id', 'ASC']]}) // ASC - crescente, DESC - decrescente
            return res.status(200).json(todasMatriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 1;
        try{
            const turmasLotadas = await matriculasServices.encontraEContaRegistros({status: 'confirmado'}, {attributes: ['turma_id'], group: ['turma_id'], having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)})
            return res.status(200).json(turmasLotadas.count)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = MatriculaController