import { render, screen } from '@testing-library/react'
import SaunaCard from './SaunaCard'
import { BrowserRouter } from 'react-router-dom'
import { mockSaunaImageAPI } from '../../networking/api'
import { SaunaMock } from '../../networking/api/sauna.mock'
import { SaunaImagesMock } from '../../networking/api/saunaImages.mock'

describe('<SaunaCard>', () => {
    test('testing property name', async () => {
        mockSaunaImageAPI(SaunaImagesMock.simpleMock())
        render(
            <BrowserRouter>
                <SaunaCard sauna={SaunaMock.sampleResponse1} />
            </BrowserRouter>
        )
        expect(await screen.findByText(SaunaMock.sampleResponse1.name)).toBeInTheDocument()
    })
})
