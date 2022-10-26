const mensagemSecreta = "minha mensagem secreta";

console.log(mensagemSecreta);

function cifraMensagem(mensagem, posicao){
    const letras = mensagem.split(''); // Retira os espaços e separa a string em cada caractere
    const mensagemCifrada = letras.map((caractere) => {
        const codCaractere = caractere.charCodeAt(0); // Pega qual o código do caractere na posição 0
        return String.fromCharCode(codCaractere + posicao);
    });

    return mensagemCifrada.join('');
}

const mensagemCifrada = cifraMensagem(mensagemSecreta, 3);

function decifraMensagem(mensagem, posicao){
    const letras = mensagem.split(''); // Retira os espaços e separa a string em cada caractere
    const mensagemCifrada = letras.map((caractere) => {
        const codCaractere = caractere.charCodeAt(0); // Pega qual o código do caractere na posição 0
        return String.fromCharCode(codCaractere - posicao);
    });

    return mensagemCifrada.join('');
}

const mensagemDecifrada = decifraMensagem(mensagemCifrada, 3);

console.log(mensagemCifrada)
console.log(mensagemDecifrada)
