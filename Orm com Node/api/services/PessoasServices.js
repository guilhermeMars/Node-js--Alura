const database = require('../models')
const Services = require('./Services');

class PessoasServices extends Services{
    constructor(){
        super('Pessoas');
        this.matriculas = new Services('Matriculas'); // Possibilita usar os dois modelos juntos
    }
    // Métodos específicos do controlador
    async pegaRegistrosAtivos(where = {}){
        return database[this.nomeModelo].findAll({ where: {...where} });
    }

    async pegaTodosRegistros(where = {}){
        return database[this.nomeModelo].scope('todos').findAll({ where: {...where} });
    }

    async cancelaPessoaMatriculas(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, {transaction: transacao});
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, {estudante_id: estudanteId}, {transaction: transacao})
        });
    }
}

module.exports = PessoasServices;
