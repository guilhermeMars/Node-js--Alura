import app from "./src/app.js";

const port = process.env.PORT || 3000;

// const rotas = {
//     '/': 'Curso de node',
//     '/livros': 'Pagina de livros',
//     '/autores': 'Guilherme Martins e Alura',
//     '/sobre': 'Informacoes sobre o projeto'
// }

// const server = http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(rotas[req.url]);
// });

app.listen(port, ()=>{
    console.log(`Servidor escutando em http://localhost:${port}`);
});
