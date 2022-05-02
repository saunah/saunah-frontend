import { UserCircleIcon } from '@heroicons/react/solid'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AppMenu from './AppMenu'

test('AppMenu containing element', () => {
    render(
        <BrowserRouter>
            <AppMenu
                leadingItem={{ title: 'Home', url: '/' }}
                mainItems={[]}
                trailingItem={{ icon: UserCircleIcon, size: 9 }}
                secondaryItems={[]}
            />
        </BrowserRouter>
    )
    const appMenu = screen.getByTestId('app-menu')
    // const child = screen.getByTestId('link-home')

    expect(appMenu).toBeInTheDocument()
    // expect(appMenu).toContainElement(child)
    // expect(child).toHaveAttribute('href', itemUrl)
})
