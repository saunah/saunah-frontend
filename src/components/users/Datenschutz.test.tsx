import { render, screen } from '@testing-library/react'
import Datenschutz from './Datenschutz'

describe('<Datenschutz>', () => {
    test('shows Datenschutz correctly', async () => {
        render(<Datenschutz />)
        expect(screen.getByTestId('datenschutz-page')).toBeInTheDocument()
    })
})
