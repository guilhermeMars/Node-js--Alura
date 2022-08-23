const database = require('../models');

class NivelController {

    static async pegaTodosNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
    static async pegaNivel(req, res){
        const { id } = req.params;
        try{
            const pessoa = await database.Niveis.findOne( {where: {id: Number(id)}} ); // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(pessoa);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaNivel(req, res){
        const novaPessoa = req.body;
        try{
            const pessoaCriada = await database.Niveis.create(novaPessoa); // Cria a pessoa no banco de dados
            return res.status(200).json(pessoaCriada); // Mostra os dados que foram criados
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async atualizaNivel(req, res){
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try{
            await database.Niveis.update(dadosAtualizados, { where: {id: Number(id)} });
            const pessoaAtualizada = await database.Niveis.findOne( {where: {id: Number(id)}} )
            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaNivel(req, res){
        const { id } = req.params
        try{
            await database.Niveis.destroy({ where: {id: Number(id)} });
            return res.status(200).json({mensagem: `Id com ${id} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraNivel(req, res){
        const { id } = req.params;
        try{
            await database.Niveis.restore( {where:{id: Number(id)}} )
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController;