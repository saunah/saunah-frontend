import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('<Home>', () => {
    test('is present', () => {
        render(<Home />)
        expect(screen.getByTestId('home')).toBeInTheDocument()
    })
})
