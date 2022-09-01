const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');

const jwt = require('jsonwebtoken');
const blacklist = require('../../redis/manipula-blacklist');

function criaTokenJwt(usuario){
  const payload = {
    id: usuario.id
  };

  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: '15m' }); // O segundo parâmetro é o que torna a senha segura
  // Para isso, o node possui um comando que gera uma string pseudo-aleatório, basta rodar: node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"
  // Para não deixar a chave hard-coded, nós colocamos em uma variável de ambiente (.env)
  return token;
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email
      });

      await usuario.adicionaSenha(senha);

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  login: (req, res) =>{ // Se o login for bem sucedido ele só retorna 204 e uma página vazia (e com os cabeçalhos podendo ser úteis)
    const token = criaTokenJwt(req.user); // User é gerado na hora que o passport.autenticate
    res.set('Authorization', token);
    res.status(204).send();
  },

  logout: async (req, res) =>{
    try{
      const token = req.token;
      await blacklist.adiciona(token);
      res.status(204).send();
    }catch(error){
      res.status(500).json({ erro: error.message })
    }
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
