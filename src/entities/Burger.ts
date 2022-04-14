import { assert } from 'console'

type Burger = {
    getBasePrice(): number
    getTotalPrice(): number
    addExtras: (extras: Extra[]) => void
}

type Extra = {
    name: string
    price: number
}

class Hambuger implements Burger {
    extras: Extra[] = []

    getBasePrice = () => 6

    getTotalPrice(): number {
        const extrasPrices = this.extras.map(extra => extra.price).reduce((x, y) => x + y)
        return this.getBasePrice() + extrasPrices
    }

    addExtras(extras: Extra[]) {
        this.extras = extras
    }
}

class SignatureBurgerWithoutExtras implements Burger {
    getBasePrice = () => 10
    getTotalPrice = this.getBasePrice

    addExtras(extras: Extra[]) {
        // ignore extras, it's not possible to add extras
    }
}

export { type Extra, type Burger, Hambuger, SignatureBurgerWithoutExtras }

const burger: Burger = /* ???  */ new Hambuger()
const bacon: Extra = { name: 'bacon', price: 2 }

burger.addExtras([bacon])

const basePrice = burger.getBasePrice()
const totalPrice = burger.getTotalPrice()

// This should be true, is it?
assert(basePrice + bacon.price === totalPrice)
