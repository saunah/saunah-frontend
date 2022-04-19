import { ReactNode } from 'react'
import './AppContainer.css'

/**
 * This component provides the the wrapper to contain
 * the whole application. It mainly serves styling
 * and alignment purposes.
 */
const AppContainer = (props: AppContainerProps) => {
    return (
        <div className="p-4 min-h-screen flex flex-col justify-between items-center" data-testid="app-container">
            {props.children}
        </div>
    )
}

export default AppContainer

export type AppContainerProps = {
    children?: ReactNode
}
