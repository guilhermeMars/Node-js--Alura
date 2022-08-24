const database = require('../models'); // já procura o index.js por padrão
const Sequelize = require('sequelize');

class PessoaController{
    static async pegaPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await database.Pessoas.findAll(); // findAll - sequelize, ao invés de passar todo o código de "select * from Pessoas"
            return res.status(200).json(pessoasAtivas);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaTodasPessoas(req, res){
        try{
            const todasPessoas = await database.Pessoas.scope('todos').findAll(); // Fica fora do escopo padrão
            return res.status(200).json(todasPessoas);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaPessoa(req, res){
        const { id } = req.params;
        try{
            const pessoa = await database.Pessoas.findOne( {where: {id: Number(id)}} ); // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(pessoa);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const pessoaCriada = await database.Pessoas.create(novaPessoa); // Cria a pessoa no banco de dados
            return res.status(200).json(pessoaCriada); // Mostra os dados que foram criados
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async atualizaPessoa(req, res){
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try{
            await database.Pessoas.update(dadosAtualizados, { where: {id: Number(id)} });
            const pessoaAtualizada = await database.Pessoas.findOne( {where: {id: Number(id)}} )
            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaPessoa(req, res){
        const { id } = req.params
        try{
            await database.Pessoas.destroy({ where: {id: Number(id)} });
            return res.status(200).json({mensagem: `Id com ${id} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraPessoa(req, res){
        const { id } = req.params;
        try{
            await database.Pessoas.restore( {where:{id: Number(id)}} )
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    //http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
    static async pegaMatricula(req, res){
        const { matriculaId, estudanteId } = req.params;
        try{
            const matricula = await database.Matriculas.findOne( {where: {id: Number(matriculaId), estudante_id: Number(estudanteId)}} ); // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(matricula);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaMatricula(req, res){
        const { estudanteId } = req.params;
        const dadosAtualizados = { ...req.body, estudante_id: Number(estudanteId) };
        try{
            const novaMatricula = await database.Matriculas.create(dadosAtualizados);
            return res.status(200).json(novaMatricula);
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        const dadosAtualizados = req.body;
        try{
            await database.Matriculas.update(dadosAtualizados, { where: {id: Number(matriculaId), estudante_id: Number(estudanteId)} });
            const matriculaAtualizada = await database.Matriculas.findOne( {where: {id: Number(matriculaId), estudante_id: Number(estudanteId)}} )
            return res.status(200).json(matriculaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            await database.Matriculas.destroy({ where: {id: Number(matriculaId), estudante_id: Number(estudanteId)} });
            return res.status(200).json({mensagem: `Id com ${matriculaId} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            await database.Matriculas.restore( {where:{id: Number(matriculaId), estudante_id: Number(estudanteId)}} )
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculas(req, res){
        const { estudanteId } = req.params
        try{
            const pessoa = await database.Pessoas.findOne( {where: {id: Number(estudanteId)}, limit: 20, order: [['estudante_id', 'ASC']]} ); // ASC - crescente, DESC - decrescente
            const matriculas = await pessoa.getAulasMatriculadas(); // getAulasMatriculadas - Nome dado ao escopo (models/pessoas.js) com o método get criado automaticamente (mixin)
            return res.status(200).json(matriculas);
            // Podemos resumir mixins em: classes que contêm métodos que podem ser utilizados por outras classes, sem a necessidade de herança direta. Dito de outra forma, um mixin fornece métodos que implementam um certo comportamento em objetos, sem poder ser utilizado sozinho, mas sim para adicionar esse comportamento a outras classes.
            // https://cursos.alura.com.br/course/orm-nodejs-avancando-sequelize/task/79567
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculasTurma(req, res){
        const {turmaId} = req.params
        try{
            const todasMatriculas = await database.Matriculas.findAndCountAll( {where: {turma_id: Number(turmaId), status: 'confirmado'}} )
            return res.status(200).json(todasMatriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 4;
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({ where: {status: 'confirmado'}, attributes: ['turma_id'], group: ['turma_id'], having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)})
            return res.status(200).json(turmasLotadas.count)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;
