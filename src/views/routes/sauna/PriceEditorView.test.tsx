import PriceEditorView from './PriceEditorView'
import { Price } from '../../../entities/Price'
import { mockPriceAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

describe('<PriceEditorView>', () => {
    test('the correct info is fetched', async () => {
        const mock = mockPriceAPI(defaultMock())
        render(<PriceEditorView />, { wrapper })

        await waitForStateUpdate()
        expect(screen.getByTestId('price-editor')).toBeInTheDocument()
        expect(mock.list).toBeCalledTimes(1)
    })

    test('the correct endpoints are called on save', async () => {
        const mock = mockPriceAPI(defaultMock())
        render(<PriceEditorView />, { wrapper })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('submit-button'))
        await waitForStateUpdate()
        expect(mock.edit).toBeCalledWith(1, price1)
        expect(mock.edit).toBeCalledTimes(1)
        expect(screen.getByText('Saunas')).toBeInTheDocument()
    })

    test('calls create when no pice exists', async () => {
        // fill mock with nothing
        const mock = mockPriceAPI(defaultMock([]))
        render(<PriceEditorView />, { wrapper })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('submit-button'))
        await waitForStateUpdate()
        expect(mock.add).toBeCalledWith(Price.emptyRequest())
        expect(mock.add).toBeCalledTimes(1)
        expect(screen.getByText('Saunas')).toBeInTheDocument()
    })
})

const wrapper = (props: { children?: ReactNode }) => {
    return (
        <AlertProvider>
            <MemoryRouter initialEntries={['/saunas/pricing']}>
                <Routes>
                    <Route path="/saunas/pricing" element={props.children} />
                    <Route path="/saunas" element={<div>Saunas</div>} />
                </Routes>
            </MemoryRouter>
        </AlertProvider>
    )
}

const defaultMock = (listReturn: Price.Response[] = [price1, price2]) => {
    return {
        list: jest.fn(() => Promise.resolve(listReturn)),
        get: jest.fn(() => Promise.resolve(price1)),
        add: jest.fn(() => Promise.resolve(price1)),
        edit: jest.fn(() => Promise.resolve(price1)),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const price1: Price.Response = {
    id: 1,
    transportService: 1,
    washService: 2,
    saunahImp: 3,
    deposit: 4,
    handTowel: 5,
    wood: 6,
}

const price2: Price.Response = {
    id: 2,
    transportService: 11,
    washService: 22,
    saunahImp: 33,
    deposit: 44,
    handTowel: 55,
    wood: 66,
}

// this line is needed, so we don't get state update warnings
const waitForStateUpdate = () => screen.findByTestId('price-editor-view')
