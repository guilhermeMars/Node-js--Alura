import { scryptSync, timingSafeEqual, randomBytes } from 'crypto';

function criaHashComSal(senha){
    const sal = randomBytes(16).toString('hex');
    
    const senhaHash = scryptSync(senha, sal, 64).toString('hex');
    return `${sal}:${senhaHash}`;
}

class Usuario{
    constructor(nome, senha){
        this.nome = nome;
        [this.sal, this.hash] = criaHashComSal(senha).split(':');
    }
    autentica(nome, senha){
        if(nome === this.nome){
            const testeHash = scryptSync(senha, this.sal, 64);
            const hashReal = Buffer.from(this.hash, 'hex');

            const hashCorresponde = timingSafeEqual(testeHash, hashReal);

            if(hashCorresponde){
                console.log("Usuário autenticado com sucesso!");
                return true;
            }
        }
        console.log("Usuário inválido!");
        return false;
    }
}

const gm = new Usuario("Guilherme Martins", 'ahnes321');
console.log(gm);

// Teste de sucesso
gm.autentica("Guilherme Martins", 'ahnes321');
// Teste de falha
gm.autentica("slakkkkk", 'ahnes321');
gm.autentica("Guilherme Martins", 'slakkkkk');
