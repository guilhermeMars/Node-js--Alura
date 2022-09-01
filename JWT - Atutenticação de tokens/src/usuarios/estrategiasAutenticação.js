const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const blacklist = require('../../redis/manipula-blacklist');

function verificaUsuario(usuario){
    if(!usuario){
        throw new InvalidArgumentError('Não existe usuário com este email!');
    }
}

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if(!senhaValida){
        throw new InvalidArgumentError('Email ou senha inválidos!');
    }
}

async function verificaTokenBlacklist(token){
    const tokenBlacklist = await blacklist.contemToken(token);
    if(tokenBlacklist){
        throw new jwt.JsonWebTokenError('Token inválido por logout!');
    }
}

passport.use(
    new LocalStategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) =>{
       //Objetivo de, caso as credenciais estejam certas, devolve o usuário para o passportAutenticate
        try{
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senhaHash);

            done(null, usuario);
        }catch(error){
            done(error);
        }
    })
);

passport.use(
    new BearerStrategy(async (token, done)=>{
        try{
            await verificaTokenBlacklist(token);
            const payload = jwt.verify(token, process.env.CHAVE_JWT);
            const usuario = await Usuario.buscaPorId(payload.id);
            done(null, usuario, { token: token });
        }catch(error){
            done(error);
        }
    })
)
