import PriceEditorView from './PriceEditorView'
import { Price } from '../../../entities/Price'
import { mockPriceAPI, mockUserAPI } from '../../../networking/api'
import { ReactNode } from 'react'
import AlertProvider from '../../shared/AlertProvider'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { UserMock } from '../../../networking/api/user.mock'
import { PriceMock } from '../../../networking/api/price.mock'

describe('<PriceEditorView>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
    })

    test('the correct info is fetched', async () => {
        const mock = mockPriceAPI(PriceMock.simpleMock())
        render(<PriceEditorView />, { wrapper })

        await waitForStateUpdate()
        expect(screen.getByTestId('price-editor')).toBeInTheDocument()
        expect(mock.list).toBeCalledTimes(1)
    })

    test('the correct endpoints are called on save', async () => {
        const mock = mockPriceAPI(PriceMock.simpleMock())
        render(<PriceEditorView />, { wrapper })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('submit-button'))
        await waitForStateUpdate()
        expect(mock.edit).toBeCalledWith(1, PriceMock.sampleRequest1)
        expect(mock.edit).toBeCalledTimes(1)
        expect(screen.getByText('Saunas')).toBeInTheDocument()
    })

    test('calls create when no pice exists', async () => {
        // fill mock with nothing
        const mock = mockPriceAPI(PriceMock.simpleMock({ list: [] }))
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

// this line is needed, so we don't get state update warnings
const waitForStateUpdate = () => screen.findByTestId('price-editor-view')
