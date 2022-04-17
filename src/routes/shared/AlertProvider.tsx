import React, { ReactNode, useReducer } from 'react'
import { Alert, AlertDuration, ControlledAlert } from '../../entities/Alert'
import { removeId } from '../../utils/identifiable'
import AlertComponent from '../../components/base/Alert'

export type AlertState = {
    push: (alert: Alert) => void
    success: (text: string, duration?: AlertDuration) => void
    info: (text: string, duration?: AlertDuration) => void
    warning: (text: string, duration?: AlertDuration) => void
    error: (text: string, duration?: AlertDuration) => void
}

export const AlertContext = React.createContext<AlertState>(null!)
export const useAlert = () => React.useContext(AlertContext)

export type AlertProviderProps = {
    children?: ReactNode
}

let uniqueId = 1
const AlertProvider = (props: AlertProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const push = (alert: Alert) => {
        const id = `alert-${uniqueId++}`
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
    removeId?: string
}

const initialState: InternalState = { alerts: [] }
const reducer = (state: InternalState, action: InternalActions) => {
    let alerts = [...state.alerts]
    if (action.add) alerts.push(action.add)
    if (action.removeId) alerts = removeId(alerts, action.removeId)
    return { alerts }
}
