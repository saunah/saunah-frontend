import { render, screen } from '@testing-library/react'
import SaunaCard from './SaunaCard'
import { BrowserRouter } from 'react-router-dom'
import { SaunaImage } from '../../entities/SaunaImage'
import { mockSaunaImageAPI } from '../../networking/api'
import { SaunaMock } from '../../networking/api/sauna.mock'

const imagesMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([saunaImage1])),
        add: jest.fn(() => Promise.resolve()),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const saunaImage1: SaunaImage.Response = {
    id: 1,
    saunaId: 1,
    fileName: 'test-sauna-1',
}

describe('<SaunaCard>', () => {
    test('testing property name', async () => {
        mockSaunaImageAPI(imagesMock())
        render(
            <BrowserRouter>
                <SaunaCard sauna={SaunaMock.sampleResponse1} />
            </BrowserRouter>
        )
        expect(await screen.findByText(SaunaMock.sampleResponse1.name)).toBeInTheDocument()
    })
})
