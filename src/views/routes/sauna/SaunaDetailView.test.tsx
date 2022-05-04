import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SaunaDetailView from './SaunaDetailView'

describe('<SaunaDetailView>', () => {
    test('is here', () => {
        render(<SaunaDetailView />, { wrapper })
        expect(screen.getByText('Details', { exact: false })).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <MemoryRouter initialEntries={['/saunas/1']}>
            <Routes>
                <Route path="/saunas/:saunaId" element={props.children} />
            </Routes>
        </MemoryRouter>
    )
}
