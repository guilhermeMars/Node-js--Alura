// const database = require('../models'); // já procura o index.js por padrão
// const Sequelize = require('sequelize');

const { PessoasServices, MatriculasServices } = require('../services');
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController{
    static async pegaPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos(); // findAll - sequelize, ao invés de passar todo o código de "select * from Pessoas"
            return res.status(200).json(pessoasAtivas);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaTodasPessoas(req, res){
        try{
            const todasPessoas = await pessoasServices.pegaTodosRegistros() // Fica fora do escopo padrão
            return res.status(200).json(todasPessoas);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaPessoa(req, res){
        const { id } = req.params;
        try{
            const pessoa = await pessoasServices.pegaUmRegistro({id: Number(id)}) // O primeiro id diz respeito a coluna e o segundo ao que é passado na URL
            return res.status(200).json(pessoa);
        } catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async criaPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const pessoaCriada = await pessoasServices.criaRegistro(novaPessoa); // Cria a pessoa no banco de dados
            return res.status(200).json(pessoaCriada); // Mostra os dados que foram criados
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async atualizaPessoa(req, res){
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try{
            await pessoasServices.atualizaRegistro(dadosAtualizados, {id: Number(id)})
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id)
            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async apagaPessoa(req, res){
        const { id } = req.params
        try{
            await pessoasServices.apagaRegistro({ id: Number(id) })
            return res.status(200).json({mensagem: `Id com ${id} deletado com sucesso`});
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async restauraPessoa(req, res){
        const { id } = req.params;
        try{
            await pessoasServices.restauraRegistro({ id: Number(id) })
            return res.status(200).json({ mensagem: `Id ${id} foi restaurado!` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculas(req, res){
        const { estudanteId } = req.params
        try{
            const pessoa = await pessoasServices.pegaUmRegistro({id: Number(estudanteId)})
            const matriculas = await pessoa.getAulasMatriculadas(); // getAulasMatriculadas - Nome dado ao escopo (models/pessoas.js) com o método get criado automaticamente (mixin)
            return res.status(200).json(matriculas);
            // Podemos resumir mixins em: classes que contêm métodos que podem ser utilizados por outras classes, sem a necessidade de herança direta. Dito de outra forma, um mixin fornece métodos que implementam um certo comportamento em objetos, sem poder ser utilizado sozinho, mas sim para adicionar esse comportamento a outras classes.
            // https://cursos.alura.com.br/course/orm-nodejs-avancando-sequelize/task/79567
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async cancelaPessoa(req, res){
        const { estudanteId } = req.params;
        try{
            // Transaction serve para, quando for mexer em mais de uma tabela, evitar erros e alterações erradas no banco
            await pessoasServices.cancelaPessoaMatriculas({id: Number(estudanteId)})
            return res.status(200).json({ message: `Matriculas do estudante ${estudanteId} foram canceladas` })
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;
