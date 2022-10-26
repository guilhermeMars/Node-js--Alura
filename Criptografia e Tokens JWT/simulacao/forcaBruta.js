// Reutilizar o sistema de autenticação de hash

import { createHash } from 'crypto';

class Usuario{
    constructor(nome, senha){
        this.nome = nome;
        this.hash = this.criaHash(senha);
    }

    criaHash(senha){
        return createHash('sha256').update(senha).digest('hex');
    }
    
    autentica(nome, senha){
        if(nome === this.nome && this.hash === this.criaHash(senha)){
            console.log("Usuário autenticado com sucesso!");
            return true;
        }
        return false;
    }
}

const usuario = new Usuario('Guilherme Martins', '1534');

for(let senhaTeste = 0; senhaTeste <= 9999; senhaTeste++){
        if(usuario.autentica('Guilherme Martins', senhaTeste.toString())){
            console.log(`A senha do usuário é: ${senhaTeste}`);
        }
}
