import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import app from "../../app";
import request from 'supertest';

let server;
// Hooks
// Fazem um determinada ação antes dos testes começarem ou acabarem
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
})
afterEach(() => {
    server.close();
});

describe("GET em /editoras", () => {
    it("Deve retornar uma lista de editoras", async() => {
        const resposta = await request(app)
            .get("/editoras")
            .set('Accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200);

        expect(resposta.body[0].email).toEqual('e@e.com')
    });
});

let idResposta;
describe("POST em /editoras", () => {
    it('Deve adicionar uma nova editora', async() =>{
        const resposta = await request(app)
            .post('/editoras')
            .send({
                nome: "CDC",
                cidade: "São Paulo",
                email: "gui@gui.com"
            })
            .expect(201)

        idResposta = resposta.body.content.id;
    });
    it("Deve não adicionar nada ao passar o body vazio", async () => {
        await request(app)
            .post('/editoras')
            .send({})
            .expect(400);
    })
})

describe('GET em /editoras/id', () => {
    it('Deve retornar recurso selecionado', async () => {
        await request(app)
            .get(`/editoras/${idResposta}`)
            .expect(200);
    })
})

describe('PUT em /editoras/id', () => {
    // Each
    // Para cada campo ele roda um teste diferente
    // É passado nos params da arrow function
    it.each([
        ["nome", { nome: 'Casa do Codigo' }],
        ["cidade", { cidade: 'SP' }],
        ["email", { email: 'gui@gui.com' }]
    ]) ("Deve alterar o campo %s", async (chave, param) => { // O %s pega uma string que foi encontrada na tabela do each
        const requisicao = { request };
        const spy = jest.spyOn(requisicao, 'request');
        await requisicao.request(app)
            .put(`/editoras/${idResposta}`)
            .send(param)
            .expect(204);
        
        expect(spy).toHaveBeenCalled();
    })
})

describe("DELETE em /editoras", () => {
    it("Deletar o recurso adicionado", async() => {
        await request(app)
            .delete(`/editoras/${idResposta}`)
            .expect(200);
    })
})

describe("DELETE em /editoras/id", () => {
    it("Deve retornar o recurso selecionado", async() => {
        await request(app)
            .get(`/editoras/${idResposta}`)
            .expect(200);
    })
})
