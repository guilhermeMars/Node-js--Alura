import Item from '../item'
describe('Testes dos itens', () => {
    it('Deve ter 3 campos: nome, valor e quantidade', () => {
        const item = new Item('Beterraba', 2.5, 10);

        expect(item.nome).toBe('Beterraba');
        expect(item.valor).toBe(2.5);
        expect(item.quantidade).toBe(10);
    })
    it('Deve ter o preço calculado de acordo com a quantidade', () => {
        const item = new Item('Batata', 5, 10);
        const item2 = new Item('Abacaxi', 0.1, 3);
        
        expect(item.pegaValorTotalItem()).toBe(50);
        // O valor acaba saindo 0.300004 (problemas de se trabalhar com decimal)
        // toBeCloseTo() ajuda nesse caso
        expect(item2.pegaValorTotalItem()).toBeCloseTo(0.3);
    })
})
