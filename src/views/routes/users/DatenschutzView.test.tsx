import { render, screen } from '@testing-library/react'
import DatenschutzView from './DatenschutzView'

describe('<DatenschutzView>', () => {
    test('shows DatenschutzView correctly', async () => {
        render(<DatenschutzView />)
        expect(screen.getByTestId('datenschutz')).toBeInTheDocument()
    })
})
