import { Hambuger } from './Burger'

describe('Burger', () => {
    test('should be correctly priced.', () => {
        const burger = new Hambuger()
        burger.addExtras([{ name: 'hello', price: 3 }])
        expect(burger.getTotalPrice()).toBe(9)
    })
})
