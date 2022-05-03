import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AppMenu from './AppMenu'

describe('<AppMenu>', () => {
    const itemUrl = '/'
    const defaultIconClass = 'w-7 h-7'
    const customIconClass = 'w-9 h-9'
    const testIdLeading = 'leading-item'
    const testIdTrailing = 'trailing-item'
    const testIdPrimaryFirst = 'primary-first'
    const testIdPrimarySecond = 'primary-second'
    const testIdSecondaryFirst = 'secondary-first'
    const testIdSecondarySecond = 'secondary-second'

    test('contains leading and trailing elements', () => {
        render(<TestMenu />)

        const appMenu = screen.getByTestId('app-menu')
        const leadingItem = screen.getByTestId(testIdLeading)
        const trailingItem = screen.getByTestId(testIdTrailing)

        expect(appMenu).toBeInTheDocument()
        expect(appMenu).toContainElement(leadingItem)
        expect(leadingItem).toHaveAttribute('href', itemUrl)
        expect(appMenu).toContainElement(trailingItem)
    })

    test('contains primary elements', () => {
        render(<TestMenu />)

        const appMenu = screen.getByTestId('app-menu')
        const first = screen.getByTestId(testIdPrimaryFirst)
        const second = screen.getByTestId(testIdPrimarySecond)

        expect(appMenu).toBeInTheDocument()
        expect(appMenu).toContainElement(first)
        expect(appMenu).toContainElement(second)
    })

    test('contains secondary elements after clicking', () => {
        render(<TestMenu />)

        const appMenu = screen.getByTestId('app-menu')
        const trailingItem = screen.getByTestId(testIdTrailing)

        fireEvent.click(trailingItem)

        const first = screen.getByTestId(testIdSecondaryFirst)
        const second = screen.getByTestId(testIdSecondarySecond)

        expect(appMenu).toBeInTheDocument()
        expect(appMenu).toContainElement(first)
        expect(appMenu).toContainElement(second)
    })

    test('custom classes are added to icons', () => {
        render(<TestMenu />)

        const trailingItem = screen.getByTestId(testIdTrailing)
        const trailingIcon = trailingItem.querySelector('svg')

        expect(trailingIcon).toHaveClass(customIconClass)
    })

    test('default classes are added to icons', () => {
        render(<TestMenu />)

        const leadingItem = screen.getByTestId(testIdLeading)
        const leadingIcon = leadingItem.querySelector('svg')

        expect(leadingIcon).toHaveClass(defaultIconClass)
    })

    function TestMenu() {
        return (
            <BrowserRouter>
                <AppMenu
                    leadingItem={{ icon: HomeIcon, url: itemUrl, testId: testIdLeading }}
                    mainItems={[
                        { title: <>Primary First</>, testId: testIdPrimaryFirst },
                        { title: <>Primary Second</>, testId: testIdPrimarySecond },
                    ]}
                    trailingItem={{ icon: UserCircleIcon, iconClasses: customIconClass, testId: testIdTrailing }}
                    secondaryItems={[
                        { title: <>Secondary First</>, testId: testIdSecondaryFirst },
                        { title: <>Secondary Second</>, testId: testIdSecondarySecond },
                    ]}
                />
            </BrowserRouter>
        )
    }
})
