import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import Overview from './Overview'

describe('<Overview>', () => {

    test('render correctly', () => {
        render(<BrowserRouter><Overview/></BrowserRouter>);
        const Ov1 = screen.getByTestId("overviewTID")
        expect(Ov1).toHaveClass("ml-16 mr-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3")
        // Sinvoll wenn definitiver TextContent steht
        //expect(Ov1).toHaveTextContent("")
        
    })

})