import { generateKeyPairSync, publicEncrypt, publicDecrypt, privateDecrypt } from 'crypto';

const { privateKey, publicKey } = generateKeyPairSync('rsa', 
    {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }}
);

// console.log(publicKey);
// console.log(privateKey);

const dadosCriptografados = publicEncrypt(publicKey, Buffer.from("Mensagem secreta e segura"));

// Transmissão

const dadosDescriptografados = privateDecrypt(privateKey, dadosCriptografados);

console.log(`Dados decifrados: ${dadosDescriptografados}`);
