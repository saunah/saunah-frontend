import React, { ReactNode, useReducer } from 'react'
import { Alert, AlertDuration, ControlledAlert } from '../../entities/Alert'
import { removeId } from '../../utils/identifiable'
import AlertComponent from '../../components/base/Alert'

export type AlertState = {
    /**
     * Pushes an alert to the state. It will be presented to the user.
     */
    push: (alert: Alert) => void
    /**
     * Pushes an alert of type `success` to the state. Convenience function which uses `push`.
     */
    success: (text: string, duration?: AlertDuration) => void
    /**
     * Pushes an alert of type `info` to the state. Convenience function which uses `push`.
     */
    info: (text: string, duration?: AlertDuration) => void
    /**
     * Pushes an alert of type `warning` to the state. Convenience function which uses `push`.
     */
    warning: (text: string, duration?: AlertDuration) => void
    /**
     * Pushes an alert of type `error` to the state. Convenience function which uses `push`.
     */
    error: (text: string, duration?: AlertDuration) => void
}

export const AlertContext = React.createContext<AlertState>(null!)

/**
 * This hook provides the functionality to present alerts to the user.
 */
export const useAlert = () => React.useContext(AlertContext)

export type AlertProviderProps = {
    children?: ReactNode
}

let uniqueId = 1
/**
 * The AlertProvider provides the context for alerts, so children can use the `useAlert()` hook.
 */
const AlertProvider = (props: AlertProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const push = (alert: Alert) => {
        const id = uniqueId++
        const remove = () => dispatch({ removeId: id })
        const newAlert: ControlledAlert = { ...alert, id, remove }
        dispatch({ add: newAlert })
        setTimeout(remove, alert.duration ?? AlertDuration.SHORT)
    }

    const success = (text: string, duration?: AlertDuration) => push({ text, duration, variant: 'success' })
    const info = (text: string, duration?: AlertDuration) => push({ text, duration, variant: 'info' })
    const warning = (text: string, duration?: AlertDuration) => push({ text, duration, variant: 'warning' })
    const error = (text: string, duration?: AlertDuration) => push({ text, duration, variant: 'error' })

    const alertState: AlertState = { push, success, info, warning, error }

    return (
        <AlertContext.Provider value={alertState}>
            {props.children}

            <div className="fixed bottom-0 right-0 p-4 w-full sm:w-96 z-50">
                {state.alerts.map(alert => (
                    <div className="mt-2" data-testid={alert.id} key={alert.id}>
                        <AlertComponent variant={alert.variant} text={alert.text} onDismiss={() => alert.remove()} />
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    )
}

export default AlertProvider

type InternalState = {
    alerts: ControlledAlert[]
}

type InternalActions = {
    add?: ControlledAlert
    removeId?: number
}

const initialState: InternalState = { alerts: [] }
const reducer = (state: InternalState, action: InternalActions) => {
    let alerts = [...state.alerts]
    if (action.add) alerts.push(action.add)
    if (action.removeId) alerts = removeId(alerts, action.removeId)
    return { alerts }
}
