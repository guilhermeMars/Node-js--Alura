const database = require('../models');

class Services{
    constructor(nomeModelo){
        this.nomeModelo = nomeModelo;
    }

    async pegaTodosRegistros(where = {}){
        return database[this.nomeModelo].findAll({ where: {...where} }); // findAll - sequelize, ao invés de passar todo o código de "select * from Pessoas"
    }

    async pegaUmRegistro(where = {}){
        return database[this.nomeModelo].findOne({ where: {...where} });
    }

    async criaRegistro(dados){
        return database[this.nomeModelo].create(dados)
    }

    async atualizaRegistro(dadosAtt, where, transacao = {}){
        return database[this.nomeModelo].update(dadosAtt, {where: {...where}}, transacao); // Consegue utilizar com e sem transação
    }

    async atualizaRegistros(dadosAtt, where, transacao = {}){
        return database[this.nomeModelo].update(dadosAtt, {where: {...where}}, transacao); // Consegue utilizar com e sem transação
    }

    async apagaRegistro(where){
        return database[this.nomeModelo].destroy({ where: {...where} });
    }

    async restauraRegistro(where){
        return database[this.nomeModelo].restore({ where: {...where} })
    }

    async encontraEContaRegistros(where, agreg){
        return database[this.nomeModelo].findAndCountAll({ where: {...where}, ...agreg })
    }
}

module.exports = Services;
