// const database = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op; // Operador do sequelize
const { TurmasServices } = require('../services');
const turmasServices = new TurmasServices;

class TurmaController {

    static async pegaTodasTurmas(req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null // Verifica se os valores existem
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        // /turmas?data_inicial=2020-01-01&data_final=2020-03-01
        try {
            const todasAsTurmas = await turmasServices.pegaTodosRegistros({ where })
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async pegaTurma(req, res){
        const { id } = req.params;
        try{
            const pessoa = await turmasServices.pegaUmRegistro({id: Number(id)}) // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(pessoa);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaTurma(req, res){
        const novaPessoa = req.body;
        try{
            const turmaCriada = await turmasServices.criaRegistro(turmaCriada); // Cria a pessoa no banco de dados
            return res.status(200).json(turmaCriada); // Mostra os dados que foram criados
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async atualizaTurma(req, res){
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try{
            await turmasServices.atualizaRegistro(dadosAtualizados, {id: Number(id)});
            const turmaAtualizada = await turmasServices.pegaUmRegistro({id: Number(id)});
            return res.status(200).json(turmaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaTurma(req, res){
        const { id } = req.params
        try{
            await turmasServices.apagaRegistro({id: Number(id)})
            return res.status(200).json({mensagem: `Id com ${id} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraTurma(req, res){
        const { id } = req.params;
        try{
            await turmasServices.restauraRegistro({id: Number(id)})
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController;