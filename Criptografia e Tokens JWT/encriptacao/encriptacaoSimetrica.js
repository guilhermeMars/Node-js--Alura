import { randomBytes, createDecipheriv, createCipheriv } from 'crypto';

const mensagem = "Demonstração do curso";
const chave = randomBytes(32);
// Vetor de inicialização
// Ajuda na aleatoriedade, utilizado junto na chave
const vi = randomBytes(16);

const cifra = createCipheriv('aes256', chave, vi);
const mensagemCifrada = cifra.update(mensagem, 'utf-8', 'hex') + cifra.final('hex'); // Precisa adicionar no final um caractere de finalização (por isso o "+" )

console.log(mensagemCifrada);

// Transmissão ---- chave, vi, mensagem
// Decifrar mensagem

const decifra = createDecipheriv('aes256', chave, vi);

const mensagemDecifrada = decifra.update(mensagemCifrada, 'hex', 'utf-8') + decifra.final('utf-8')

console.log(`Decifrado: ${mensagemDecifrada.toString('utf-8')}`)
