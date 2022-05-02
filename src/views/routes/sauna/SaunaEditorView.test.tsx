import { screen, render, fireEvent } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Sauna } from '../../../entities/Sauna'
import { SaunaImage } from '../../../entities/SaunaImage'
import { mockSaunaAPI, mockSaunaImageAPI } from '../../../networking/api'
import AlertProvider from '../../shared/AlertProvider'
import SaunaEditorView from './SaunaEditorView'

describe('<SaunaEditorView>', () => {
    test('the correct info is fetched on the edit page', async () => {
        const mock = mockSaunaAPI(defaultMock())
        const imageMock = mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/sauna/99/edit') })
        // We have to call this every, when the view performs a api-call.
        // Otherwise the state-update after the api-call will print warnings in the console.
        await waitForStateUpdate()
        expect(screen.getByTestId('sauna-editor')).toBeInTheDocument()
        expect(screen.getByTestId('sauna-image-editor')).toBeInTheDocument()
        expect(screen.getByTestId('sauna-image-uploader')).toBeInTheDocument()

        expect(mock.get).toBeCalledTimes(1)
        expect(mock.get).toBeCalledWith(99)
        expect(imageMock.list).toBeCalledTimes(1)
        expect(imageMock.list).toBeCalledWith(99)
    })

    test('no sauna is fetched on the create page', async () => {
        const mock = mockSaunaAPI(defaultMock())
        const imageMock = mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/sauna/create') })
        expect(screen.getByTestId('sauna-editor')).toBeInTheDocument()
        expect(screen.queryByTestId('sauna-image-editor')).not.toBeInTheDocument()
        expect(screen.queryByTestId('sauna-image-uploader')).not.toBeInTheDocument()

        expect(mock.get).toBeCalledTimes(0)
        expect(imageMock.list).toBeCalledTimes(0)
    })
    test('the edit endpoint is called on submit on the edit page', async () => {
        const mock = mockSaunaAPI(defaultMock())
        mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/sauna/99/edit') })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('submit-button'))

        expect(mock.edit).toBeCalledWith(99, sauna1)
        expect(mock.edit).toBeCalledTimes(1)
        expect(mock.add).toBeCalledTimes(0)
        await waitForStateUpdate()
    })

    test('the add endpoint is called on submit on the create page', async () => {
        const mock = mockSaunaAPI(defaultMock())
        mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/sauna/create') })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('submit-button'))

        expect(mock.add).toBeCalledWith(Sauna.emptyRequest())
        expect(mock.add).toBeCalledTimes(1)
        expect(mock.edit).toBeCalledTimes(0)
        await waitForStateUpdate()
    })
})

const wrapper = (startRoute: string) => (props: { children?: ReactNode }) => {
    return (
        <AlertProvider>
            <MemoryRouter initialEntries={[startRoute]}>
                <Routes>
                    <Route path="/sauna/:saunaId/edit" element={props.children} />
                    <Route path="/sauna/create" element={props.children} />
                </Routes>
            </MemoryRouter>
        </AlertProvider>
    )
}

const defaultMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([sauna1])),
        get: jest.fn(() => Promise.resolve(sauna1)),
        add: jest.fn(() => Promise.resolve(sauna1)),
        edit: jest.fn(() => Promise.resolve(sauna1)),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const imagesMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([saunaImage1])),
        add: jest.fn(() => Promise.resolve()),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const saunaImage1: SaunaImage.Response = {
    id: 1,
    saunaId: 1,
    fileName: 'test-sauna-1',
}

const sauna1: Sauna.Response = {
    id: 1,
    name: 'Sauna 1',
    description: 'Das ist Sauna 1.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: 8400,
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

// this line is needed, so we don't get state update warnings
const waitForStateUpdate = () => screen.findByTestId('sauna-editor-view')
