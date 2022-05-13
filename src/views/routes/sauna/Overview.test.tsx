import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SaunaImage } from '../../../entities/SaunaImage'
import { mockSaunaAPI, mockSaunaImageAPI } from '../../../networking/api'
import { SaunaMock } from '../../../networking/api/sauna.mock'
import Overview from './Overview'

const imagesMock = () => {
    return {
        list: jest.fn(() => Promise.resolve([saunaImage1])),
        add: jest.fn(() => Promise.resolve()),
        remove: jest.fn(() => Promise.resolve()),
    }
}

const wrapper = (startRoute: string) => (props: { children?: ReactNode }) => {
    return (
        <MemoryRouter initialEntries={[startRoute]}>
            <Routes>
                <Route path="/saunas" element={props.children} />
            </Routes>
        </MemoryRouter>
    )
}

const saunaImage1: SaunaImage.Response = {
    id: 1,
    saunaId: 1,
    fileName: 'test-sauna-1',
}

const waitForStateUpdate = () => screen.findByTestId('overviewTID')

describe('<Overview Tests>', () => {
    test('the correct sauna is fetched on the edit page', async () => {
        const mock = mockSaunaAPI(SaunaMock.simpleMock())
        mockSaunaImageAPI(imagesMock())

        render(<Overview />, { wrapper: wrapper('/saunas') })
        await waitForStateUpdate()
        expect(screen.getByTestId('overviewTID')).toBeInTheDocument()

        expect(mock.list).toBeCalledTimes(1)
    })
})
