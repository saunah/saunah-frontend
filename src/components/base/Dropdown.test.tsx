/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from '@testing-library/react'
import { ReactNode } from 'react'
import { Link, MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import Dropdown, { DropdownItem } from './Dropdown'

describe('<Dropdown>', () => {
    test('displays title in button', () => {
        render(<Dropdown title="Hi im the button" />)
        expect(getDropdownButton()).toHaveTextContent('Hi im the button')
    })

    test('opens panel on click', () => {
        render(<Dropdown />)
        expect(queryDropdownPanel()).not.toBeInTheDocument()
        fireEvent.click(getDropdownButton())
        expect(getDropdownPanel()).toBeInTheDocument()
    })

    test('does not open panel on click if disabled', () => {
        render(<Dropdown disabled={true} />)
        expect(queryDropdownPanel()).not.toBeInTheDocument()
        fireEvent.click(getDropdownButton())
        expect(queryDropdownPanel()).not.toBeInTheDocument()
    })

    test('displays items in open dropdown panel', () => {
        render(<Dropdown items={createDropdownItems()} />)
        fireEvent.click(getDropdownButton())
        expect(getDropdownItem(0, 0)).toHaveTextContent('Item 1')
        expect(getDropdownItem(0, 1)).toHaveTextContent('Item 2')
        expect(getDropdownItem(1, 0)).toHaveTextContent('Item 3')
        expect(getDropdownItem(1, 1)).toHaveTextContent('Item 4')
    })

    test('items call onClick when they are clicked', () => {
        const onClick = jest.fn()
        render(<Dropdown items={createDropdownItems({ mockFn: onClick })} />)
        fireEvent.click(getDropdownButton())
        fireEvent.click(getDropdownItem(0, 0))
        expect(onClick).toBeCalledTimes(1)
        expect(onClick).toBeCalledWith('Item 1')

        fireEvent.click(getDropdownItem(0, 1))
        expect(onClick).toBeCalledTimes(2)
        expect(onClick).toBeCalledWith('Item 2')

        fireEvent.click(getDropdownItem(1, 0))
        expect(onClick).toBeCalledTimes(3)
        expect(onClick).toBeCalledWith('Item 3')

        fireEvent.click(getDropdownItem(1, 1))
        expect(onClick).toBeCalledTimes(3)
    })

    test('items with route open route when clicked', () => {
        const onClick = jest.fn()
        render(
            <Wrapper>
                <Link data-testid="home-link" to="/" />
                <Dropdown items={createDropdownItems({ mockFn: onClick, route: '/test' })} />
                {/* Displays child route (to check if routing worked) */}
                <Outlet />
            </Wrapper>
        )
        fireEvent.click(getDropdownButton())

        expect(queryTestRoute()).not.toBeInTheDocument()
        fireEvent.click(getDropdownItem(0, 1))
        expect(getTestRoute()).toBeInTheDocument()
        // make sure that the mock fn was not called (route should be displayed instead of button)
        expect(onClick).toBeCalledTimes(0)

        fireEvent.click(screen.getByTestId('home-link'))
        expect(queryTestRoute()).not.toBeInTheDocument()
        fireEvent.click(getDropdownItem(1, 1))
        expect(getTestRoute()).toBeInTheDocument()
    })

    test('disabled property prevents route change or call of onClick function', () => {
        const onClick = jest.fn()
        render(
            <Wrapper>
                <Link data-testid="home-link" to="/" />
                <Dropdown items={createDropdownItems({ mockFn: onClick, route: '/test', disabled: true })} />
                {/* Displays child route (to check if routing worked) */}
                <Outlet />
            </Wrapper>
        )
        fireEvent.click(getDropdownButton())

        // Test that disabled items do nothing
        fireEvent.click(getDropdownItem(0, 0))
        expect(onClick).toBeCalledTimes(0)

        fireEvent.click(getDropdownItem(1, 1))
        expect(queryTestRoute()).not.toBeInTheDocument()

        // Test that enabled items still work
        fireEvent.click(getDropdownItem(1, 0))
        expect(onClick).toBeCalledTimes(1)
        expect(onClick).toBeCalledWith('Item 3')

        fireEvent.click(getDropdownItem(0, 1))
        expect(getTestRoute()).toBeInTheDocument()
    })
})

const Wrapper = (props: { children?: ReactNode }) => (
    <MemoryRouter initialEntries={['/']}>
        <Routes>
            <Route path="/" element={props.children}>
                <Route path="/test" element={<span data-testid="test-route"> Test route is displayed </span>} />
            </Route>
        </Routes>
    </MemoryRouter>
)

const createDropdownItems = (
    config: { mockFn?: (item: string) => void; route?: string; disabled?: boolean } = {}
): DropdownItem[][] => [
    [
        { label: 'Item 1', onClick: () => config.mockFn?.('Item 1'), disabled: config.disabled },
        { label: 'Item 2', route: config.route, onClick: () => config.mockFn?.('Item 2') },
    ],
    [
        { label: 'Item 3', onClick: () => config.mockFn?.('Item 3') },
        { label: 'Item 4', route: config.route, disabled: config.disabled },
    ],
]

const getTestRoute = () => screen.getByTestId('test-route')
const queryTestRoute = () => screen.queryByTestId('test-route')
const getDropdownButton = () => screen.getByTestId('dropdown-button')
const getDropdownPanel = () => screen.getByTestId('dropdown-panel')
const queryDropdownPanel = () => screen.queryByTestId('dropdown-panel')
const getDropdownItem = (groupIdx: number, itemIdx: number) =>
    screen.getByTestId(`dropdown-item-${groupIdx}-${itemIdx}`)
