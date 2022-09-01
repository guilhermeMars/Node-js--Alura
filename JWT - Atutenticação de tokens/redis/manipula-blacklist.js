const blacklist = require('./blacklist');

const { promisify } = require('util'); // Vem com o próprio node, transforma uma função que devolve uma promisse (já que não é suportado nesse formato)
const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function geraTokenHash(token){ // Faz a função para não guardar o token inteiro, pois é muito grande, e assim fica mais padronizado
    return createHash('sha256').update(token).digest('hex'); // digest - codificação utilizada
}

module.exports = {
    adiciona: async token =>{
        const dataExpiracao = jwt.decode(token).exp; // decode - devolve o payload sem veificação, exp - timestamp de expiração do token
        const tokenHash = geraTokenHash(token);
        await setAsync(tokenHash, '');
        blacklist.expireAt(tokenHash, dataExpiracao);
    },
    contemToken: async token =>{
        const tokenHash = geraTokenHash(token);
        const resultado = await existsAsync(tokenHash);
        return resultado === 1;
    }
}