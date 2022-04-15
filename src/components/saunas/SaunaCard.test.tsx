import {render, screen} from '@testing-library/react'
import SaunaCard from './SaunaCard'
import { Sauna } from '../../entities/Sauna'

const exampleSauna : Sauna = {
    name : 'saunaOne',
    description : 'Steam Sauna',
    imgLink : 'http'
}

describe('<SaunCard>', () => {

    test('render correctly', () => {
        render(<SaunaCard sauna={exampleSauna}/>);
        const sauna1 = screen.getByText("saunaOne")
        expect(sauna1).toBeInTheDocument()
    })

    test('testing property name', () => {
        render(<SaunaCard sauna={exampleSauna}/>);
        const sauna1 = screen.getByText("saunaOne")
        expect(sauna1).toContainHTML('<h2 class="text-2xl font-extrabold text-gray-900">saunaOne</h2>')
        expect(sauna1).toHaveClass('text-2xl font-extrabold text-gray-900')
        
    })

    test('testing property description', () => {
        render(<SaunaCard sauna={exampleSauna}/>);
        const sauna1 = screen.getByText("Steam Sauna")
        expect(sauna1).toContainHTML('<p class="text-gray-500>')
        expect(sauna1).toHaveClass('text-gray-500')
        
    })
})