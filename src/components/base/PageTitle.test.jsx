import { render, screen } from '@testing-library/react'
import PageTitle from './PageTitle'

test('PageTitle matching text', () => {
    const titleText = 'We Are SauNah'

    render(<PageTitle>{titleText}</PageTitle>)

    const pageTitle = screen.getByTestId('page-title')

    expect(pageTitle).toBeInTheDocument()
    expect(pageTitle).toHaveTextContent(titleText)
})
