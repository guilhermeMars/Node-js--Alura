// const database = require('../models');

const { NiveisServices } = require('../services');
const niveisServices = new NiveisServices();

class NivelController {

    static async pegaTodosNiveis(req, res) {
      try {
        const todosOsNiveis = await niveisServices.pegaTodosRegistros()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
    static async pegaNivel(req, res){
        const { id } = req.params;
        try{
            const pessoa = await niveisServices.pegaUmRegistro({id: Number(id)}); // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(pessoa);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaNivel(req, res){
        const novoNivel = req.body;
        try{
            const nivelCriado = await niveisServices.criaRegistro(novoNivel) // Cria a pessoa no banco de dados
            return res.status(200).json(nivelCriado); // Mostra os dados que foram criados
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async atualizaNivel(req, res){
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try{
            await niveisServices.atualizaRegistro(dadosAtualizados, {id: Number(id)});
            const nivelAtualizado = niveisServices.pegaUmRegistro({ id: Number(id) });
            return res.status(200).json(nivelAtualizado);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaNivel(req, res){
        const { id } = req.params
        try{
            await niveisServices.apagaRegistro({id: Number(id)})
            return res.status(200).json({mensagem: `Id com ${id} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraNivel(req, res){
        const { id } = req.params;
        try{
            await niveisServices.restauraRegistro({id: Number(id)})
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController;