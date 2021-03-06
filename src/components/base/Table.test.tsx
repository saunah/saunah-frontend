import { render, screen } from '@testing-library/react'
import Table from './Table'

describe('<Table>', () => {
    const defaultTestId = 'table'
    const defaultHeadings = ['Head 1', 'Head 2', 'Head 3']
    const defaultElements = [
        ['One One', 'One Two', 'One Three'],
        ['Two One', 'Two Two', 'Two Three'],
        ['Three One', 'Three Two', 'Three Three'],
    ]

    test('Displays table', () => {
        render(<Table headings={defaultHeadings} elements={defaultElements} testId="my-table" />)

        const table = screen.getByTestId('my-table')
        expect(table).toBeInTheDocument()
    })

    test('Shows headings corretly', () => {
        render(<Table headings={defaultHeadings} elements={defaultElements} />)

        const table = screen.getByTestId(defaultTestId)
        const headRow = table.querySelector('thead tr')
        headRow?.childNodes.forEach((element, elementIdx) => {
            expect(element).toHaveTextContent(defaultHeadings[elementIdx])
        })
    })

    test('Does not show thead if header is undefined', () => {
        render(<Table elements={defaultElements} />)

        const table = screen.getByTestId(defaultTestId)
        const tHead = table.querySelector('thead')
        expect(tHead).toBeNull()
    })

    test('Does not show thead if header is empty', () => {
        render(<Table headings={[]} elements={defaultElements} />)

        const table = screen.getByTestId(defaultTestId)
        const tHead = table.querySelector('thead')
        expect(tHead).toBeNull()
    })

    test('Shows contents corretly', () => {
        render(<Table headings={defaultHeadings} elements={defaultElements} />)

        const table = screen.getByTestId(defaultTestId)
        const tableBody = table.querySelector('tbody')
        tableBody?.childNodes.forEach((row, rowIdx) => {
            row.childNodes.forEach((element, elementIdx) => {
                expect(element).toHaveTextContent(defaultElements[rowIdx][elementIdx])
            })
        })
    })

    test('Does not show tbody if elements is empty', () => {
        render(<Table headings={defaultHeadings} elements={[]} />)

        const table = screen.getByTestId(defaultTestId)
        const tHead = table.querySelector('tbody')
        expect(tHead).toBeNull()
    })
})
