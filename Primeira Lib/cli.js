import chalk from "chalk";
import pegaArquivo from "./index.js";
import validaUrl from "./http-validação.js";

const caminho = process.argv;

async function processaTexto(caminhoRelativo){
    const resultado = await pegaArquivo(caminhoRelativo[2]);
    if(caminho[3] === 'validar'){
        console.log(chalk.yellow('Links validados'), await validaUrl(resultado));
    }else{
        console.log(chalk.yellow('Lista de links'), resultado);
    }
}

processaTexto(caminho);
