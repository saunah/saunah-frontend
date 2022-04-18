import { fireEvent, render, screen } from '@testing-library/react'
import AlertProvider, { AlertProviderProps, AlertState, useAlert } from './AlertProvider'
import { useEffect } from 'react'
import { AlertDuration } from '../../entities/Alert'

describe('<AlertProvider>', () => {
    test('shows alerts and they disappear correctly', async () => {
        const TestComponent = setupTestComponent(hook => {
            hook.success('Success 1', AlertDuration.SHORT)
            hook.success('Success 2', AlertDuration.LONG)
        })
        render(<TestComponent />, { wrapper })

        expect(getAlert(1)).toHaveTextContent('Success 1')
        expect(getAlert(2)).toHaveTextContent('Success 2')

        await new Promise(r => setTimeout(r, AlertDuration.SHORT))
        expect(queryAlert(1)).not.toBeInTheDocument()
        expect(queryAlert(2)).toBeInTheDocument()
    })

    test('alert is hidden on click of the x-button', () => {
        const TestComponent = setupTestComponent(hook => {
            hook.error('Here is an error')
        })
        render(<TestComponent />, { wrapper })

        expect(getAlert(3)).toHaveTextContent('Here is an error')
        fireEvent.click(getDismissButton())
        expect(queryAlert(3)).not.toBeInTheDocument()
    })
})

const getAlert = (number: number) => screen.getByTestId(`alert-${number}`)
const queryAlert = (number: number) => screen.queryByTestId(`alert-${number}`)

function setupTestComponent(callback?: (hook: AlertState) => void) {
    return () => {
        const hook = useAlert()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(() => callback?.(hook), [])
        return <div />
    }
}

const wrapper = (props: AlertProviderProps) => <AlertProvider {...props} />
const getDismissButton = () => screen.getByTestId('icon-button')
