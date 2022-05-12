import { screen, render, fireEvent } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Sauna } from '../../../entities/Sauna'
import { SaunaImage } from '../../../entities/SaunaImage'
import { mockSaunaAPI, mockSaunaImageAPI, mockUserAPI } from '../../../networking/api'
import { simpleUserMock } from '../../../networking/api/userMock'
import AlertProvider from '../../shared/AlertProvider'
import SaunaEditorView from './SaunaEditorView'

describe('<SaunaEditorView>', () => {
    beforeAll(() => {
        mockUserAPI(simpleUserMock())
    })

    test('the correct info is fetched on the edit page', async () => {
        const mock = mockSaunaAPI(defaultMock())
        const imageMock = mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/saunas/99/edit') })
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

        render(<SaunaEditorView />, { wrapper: wrapper('/saunas/create') })
        expect(screen.getByTestId('sauna-editor')).toBeInTheDocument()
        expect(screen.queryByTestId('sauna-image-editor')).not.toBeInTheDocument()
        expect(screen.queryByTestId('sauna-image-uploader')).not.toBeInTheDocument()

        expect(mock.get).toBeCalledTimes(0)
        expect(imageMock.list).toBeCalledTimes(0)
    })
    test('the edit endpoint is called on submit on the edit page', async () => {
        const mock = mockSaunaAPI(defaultMock())
        mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/saunas/99/edit') })
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

        render(<SaunaEditorView />, { wrapper: wrapper('/saunas/create') })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('submit-button'))

        expect(mock.add).toBeCalledWith(Sauna.emptyRequest())
        expect(mock.add).toBeCalledTimes(1)
        expect(mock.edit).toBeCalledTimes(0)
        await waitForStateUpdate()
    })

    test('removeFiles() api calls are done corectly', async () => {
        mockSaunaAPI(defaultMock())
        const imageMock = mockSaunaImageAPI(imagesMock())

        render(<SaunaEditorView />, { wrapper: wrapper('/saunas/99/edit') })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('remove-button-1'))
        expect(imageMock.remove).toBeCalledWith(1)
        expect(imageMock.remove).toBeCalledTimes(1)
        await waitForStateUpdate()
    })

    test('delete is called on delete-button click', async () => {
        const mock = mockSaunaAPI(defaultMock())
        mockSaunaImageAPI(imagesMock())
        window.confirm = jest.fn(() => true)

        render(<SaunaEditorView />, { wrapper: wrapper('/saunas/99/edit') })
        await waitForStateUpdate()

        fireEvent.click(screen.getByTestId('delete-button'))
        await waitForStateUpdate()

        expect(mock.remove).toBeCalled()
        expect(mock.remove).toBeCalledWith(99)
        // navigated to overview after delete
        expect(screen.getByText('Saunas')).toBeInTheDocument()
    })
})

const wrapper = (startRoute: string) => (props: { children?: ReactNode }) => {
    return (
        <AlertProvider>
            <MemoryRouter initialEntries={[startRoute]}>
                <Routes>
                    <Route path="/saunas/:saunaId/edit" element={props.children} />
                    <Route path="/saunas/create" element={props.children} />
                    <Route path="/saunas/:saunaId" element={<div>Sauna Details</div>} />
                    <Route path="/saunas" element={<div>Saunas</div>} />
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
