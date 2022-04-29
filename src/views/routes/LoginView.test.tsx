import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginView from './LoginView'

describe('<LoginViewTests>', () => {

    test('render correctly', () => {
        render(<BrowserRouter><LoginView/></BrowserRouter>)
        const element =screen.getByTestId('loginID')
        expect(element).toBeInTheDocument()
    })
})