import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockUserAPI } from '../../networking/api'
import { simpleUserMock } from '../../networking/api/userMock'
import AppMenu from './AppMenu'

describe('<AppMenu>', () => {
    const itemUrl = '/'
    const defaultIconClass = 'w-7 h-7'
    const customIconClass = 'w-9 h-9'
    const testIdMenu = 'app-menu'
    const testIdPrimaryWrap = 'app-menu-primary-items'
    const testIdLeading = 'leading-item'
    const testIdTrailing = 'trailing-item'
    const testIdPrimaryFirst = 'primary-first'
    const testIdPrimarySecond = 'primary-second'
    const testIdSecondaryFirst = 'secondary-first'
    const testIdSecondarySecond = 'secondary-second'

    beforeEach(() => {
        mockUserAPI(simpleUserMock())
    })

    test('contains leading and trailing elements', () => {
        render(<TestMenu />)

        const appMenu = screen.getByTestId(testIdMenu)
        const leadingItem = screen.getByTestId(testIdLeading)
        const trailingItem = screen.getByTestId(testIdTrailing)

        expect(appMenu).toBeInTheDocument()
        expect(appMenu).toContainElement(leadingItem)
        expect(leadingItem).toHaveAttribute('href', itemUrl)
        expect(appMenu).toContainElement(trailingItem)
    })

    test('contains primary elements', () => {
        render(<TestMenu />)

        const appMenu = screen.getByTestId(testIdMenu)
        const first = screen.getByTestId(testIdPrimaryFirst)
        const second = screen.getByTestId(testIdPrimarySecond)

        expect(appMenu).toBeInTheDocument()
        expect(appMenu).toContainElement(first)
        expect(appMenu).toContainElement(second)
    })

    test('contains secondary elements after clicking', () => {
        render(<TestMenu />)

        const appMenu = screen.getByTestId(testIdMenu)
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

    test('primary items not rendered if not added', () => {
        render(
            <BrowserRouter>
                <AppMenu />
            </BrowserRouter>
        )

        const primaryItemsWrapper = screen.getByTestId(testIdPrimaryWrap)

        expect(primaryItemsWrapper).toBeEmptyDOMElement()
    })

    function TestMenu() {
        return (
            <BrowserRouter>
                <AppMenu
                    leadingItem={{ icon: HomeIcon, url: itemUrl, testId: testIdLeading }}
                    primaryItems={[
                        { title: 'Primary First', testId: testIdPrimaryFirst },
                        { title: 'Primary Second', testId: testIdPrimarySecond },
                    ]}
                    trailingItem={{ icon: UserCircleIcon, iconClasses: customIconClass, testId: testIdTrailing }}
                    secondaryItems={[
                        { title: 'Secondary First', testId: testIdSecondaryFirst },
                        { title: 'Secondary Second', testId: testIdSecondarySecond },
                    ]}
                />
            </BrowserRouter>
        )
    }
})
