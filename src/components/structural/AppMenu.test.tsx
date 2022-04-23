import { render, screen } from '@testing-library/react'
import AppMenu from './AppMenu'

test('AppMenu containing element', () => {
    const itemUrl = 'https://zhaw.ch'
    const itemName = 'First Menu Link'

    render(
        <AppMenu>
            <a href={itemUrl}>{itemName}</a>
        </AppMenu>
    )
    const appMenu = screen.getByTestId('app-menu')
    const child = screen.getByText(itemName)

    expect(appMenu).toBeInTheDocument()
    expect(appMenu).toContainElement(child)
    expect(child).toHaveAttribute('href', itemUrl)
})
