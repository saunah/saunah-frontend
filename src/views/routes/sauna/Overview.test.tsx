import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mockSaunaAPI, mockSaunaImageAPI } from '../../../networking/api'
import { SaunaMock } from '../../../networking/api/sauna.mock'
import { SaunaImagesMock } from '../../../networking/api/saunaImages.mock'
import Overview from './Overview'

const wrapper = (startRoute: string) => (props: { children?: ReactNode }) => {
    return (
        <MemoryRouter initialEntries={[startRoute]}>
            <Routes>
                <Route path="/saunas" element={props.children} />
            </Routes>
        </MemoryRouter>
    )
}

const waitForStateUpdate = () => screen.findByTestId('overviewTID')

describe('<Overview Tests>', () => {
    test('the correct sauna is fetched on the edit page', async () => {
        const mock = mockSaunaAPI(SaunaMock.simpleMock())
        mockSaunaImageAPI(SaunaImagesMock.simpleMock())

        render(<Overview />, { wrapper: wrapper('/saunas') })
        await waitForStateUpdate()
        expect(screen.getByTestId('overviewTID')).toBeInTheDocument()

        expect(mock.list).toBeCalledTimes(1)
    })
})
