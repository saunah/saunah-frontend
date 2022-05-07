import { render, screen } from '@testing-library/react'
import { Sauna } from '../../entities/Sauna'
import SaunaDetail from './SaunaDetail'

const exampleSauna: Sauna.Response = {
    id: 1,
    name: 'saunaOne',
    description: 'Steam Sauna',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

describe('<SaunDetail>', () => {
    test('render correctly', () => {
        render(<SaunaDetail sauna={exampleSauna} />)
    })

    test('show text correctly', () => {
        render(<SaunaDetail sauna={exampleSauna} />)

        const title = screen.getByTestId('title')
        expect(title).toHaveTextContent(exampleSauna.name)

        const description = screen.getByTestId('description')
        expect(description).toHaveTextContent(exampleSauna.description)
    })
})
