import Jwt from "jsonwebtoken";

const chaveSecreta = "ChaveSuperSecreta"

const token = Jwt.sign(
    {
        apelido: "gm",
        curso: "Segurança e Node.js"
    },
    chaveSecreta
);

console.log(token);

// Decodificar

const tokenDecodificado = Jwt.verify(token, chaveSecreta);

console.log(tokenDecodificado);
