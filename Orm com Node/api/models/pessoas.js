'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // associações são feitas aqui
      Pessoas.hasMany(models.Turmas, { // Por padrão - PessoaId
        foreignKey: 'docente_id'
      });
      Pessoas.hasMany(models.Matriculas, { 
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' }, // Escopos de associação - Passando o escopo que será trabalhado +
        as: 'aulasMatriculadas' // e o nome
      });
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate:{
        validarTamanho: (dado)=>{
          if(dado.length < 3){
            throw new Error('Nome muito pequeno!')
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: {
          args: true, // isEmail: true
          msg: 'Dados do tipo e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true, // Soft Delete - Não apaga realmente do projeto, apenas oculta
    defaultScope: { // Criando um escopo padrão que é aplicado em todas as query's de Pessoas
      where: { ativo: true }
    },
    scopes: {
      todos:{
        where:{}
      }
      // Pode ter outros escopos aqui
    }
  });
  return Pessoas;
};