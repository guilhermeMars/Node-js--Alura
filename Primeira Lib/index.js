// NPM (node package menager) - Repositório de código aberto onde a comunidade disponibiliza bibliotecas
// Node Modules - Todo o código instalado ao dar o npm intall
// Primisses - Maneira que o JS lida com códigos assincronos, que precisa uma coisa acontecer para executar outra sem parar a excecução do programa

// import chalk from 'chalk';
// console.log(chalk.blue("Hello world"));

// const Paragrafo = "Texto retornado por uma função"

// function textoMostrado(string){
//     return string;
// }

// console.log(textoMostrado(Paragrafo));
import chalk from 'chalk';
import fs from 'node:fs';

function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;

    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
    return arrayResultados.length === 0 ? 'Não existem links' : arrayResultados;
}

function trataErro(erro){
    if(erro.code === 'ENOENT'){
        throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
    } else{
        throw new Error(chalk.red(erro.code, 'Erro desconhecido'));
    }

}

export default async function pegaArquivo(caminhoRelativo){ // Diz que será uma função assincrona
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoRelativo, encoding); // Await mostra onde vai ser assincrono, precisa ter o async 
        return extraiLinks(texto);
    } catch(err){
        trataErro(err);
    }
}

// pegaArquivo('./arquivos/texto01.md');

// function pegaArquivo(caminhoRelativo){
//     const encoding = 'utf-8';
//     fs.promises.readFile(caminhoRelativo, encoding)
//     .then((textoArquivo)=>{ // Após ler o arquivo, executa essa função
//         console.log(chalk.green(textoArquivo));
//     })
//     .catch((err)=>{ // Pega o erro
//         trataErro(err);
//     })
// }

// function pegaArquivo(caminhoRelativo){
//     const encoding = 'utf-8'
//     fs.readFile(caminhoRelativo, encoding, (err, data)=>{
//         if(err){
//             trataErro(err);
//         }
//         console.log(chalk.green(data));
//     })
// }
