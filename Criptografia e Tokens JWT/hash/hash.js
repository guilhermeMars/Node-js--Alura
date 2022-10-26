import { createHash } from 'crypto';

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex');
}

const senha = "senhahaha123"

console.log(criaHash(senha));

class Usuario{
    constructor(nome, senha){
        this.nome = nome;
        this.hash = criaHash(senha);
    }

    autentica(nome, senha){
        if(nome === this.nome && this.hash === criaHash(senha)){
            console.log("Usuário autenticado com sucesso!");
            return true;
        }
        console.log("Usuário inválido!");
        return false;
    }
}

const usuario = new Usuario('Guilherme Martins', 'ahnes321');

console.log(usuario);

// Caso de sucesso
usuario.autentica('Guilherme Martins', 'ahnes321');
// Caso de falha
usuario.autentica('slakkkk', 'ahnes321')
usuario.autentica('Guilherme Martins', 'slakkkk')
