import { describe, expect, it, jest } from "@jest/globals"
import Editora from "../../models/editora"

describe("Testando o modelo editora", () => {
    const objetoEditora = {
        nome: "CDC",
        cidade: "São Paulo",
        email: "gui@gui.com"
    };

    it("Deve instanciar uma nova editora", () => {
        const editora = new Editora(objetoEditora);

        // Uma forma de verificar se um objeto é a instância de outro
        expect(editora).toEqual(expect.objectContaining(objetoEditora));
    });

    // Por ser um teste demorado, por ser assíncrono, pode adicionar o skip para pular
    it.skip("Deve salvar editora no BD", () => {
        const editora = new Editora(objetoEditora);

        editora.salvar().then((dados) => {
            expect(dados.nome).toBe('CDC');
        });
    });

    it.skip("Deve salvar editora no BD com uma sintaxe moderna", async () => {
        const editora = new Editora(objetoEditora);

        const dados = await editora.salvar();

        const retornado = await Editora.pegarPeloId(dados.id)

        expect(retornado).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        )
    });

    it("Deve fazer uma chamada simulada ao BD", () => {
        const editora = new Editora(objetoEditora);

        // editora.salvar = () => {
        //     console.log('Editora salva no DB');
        // };
        // editora.salvar();

        // Mock
        // Faz uma simulação, utilizado para fazer alterações no bd, transações etc
        editora.salvar = jest.fn().mockReturnValue({
            id: 10,
            nome: "CDC",
            cidade: "São Paulo",
            email: "gui@gui.com",
            created_at: "2022-10-1",
            updated_at: "2022-10-1"
        });

        const retorno = editora.salvar();
        expect(retorno).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                ...objetoEditora,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        )
    })
})
