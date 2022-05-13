import { render, screen } from '@testing-library/react'
import { SaunaMock } from '../../networking/api/sauna.mock'
import SaunaDetail from './SaunaDetail'

describe('<SaunDetail>', () => {
    test('render correctly', () => {
        render(<SaunaDetail sauna={SaunaMock.sampleResponse1} />)
    })

    test('show text correctly', () => {
        render(<SaunaDetail sauna={SaunaMock.sampleRemoteResponse1} />)

        const description = screen.getByTestId('description')
        expect(description).toHaveTextContent(SaunaMock.sampleRemoteResponse1.description)
    })
})
