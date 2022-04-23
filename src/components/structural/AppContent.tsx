import { ReactNode } from 'react'

/**
 * This component provides a wrapper to put in actual
 * page-content which should be displayed. It takes
 * care of positioning and sizing.
 */
const AppContent = (props: AppContentProps) => {
    return (
        <div className="container mx-auto max-w-screen-xl mt-28 mb-10" data-testid="app-content">
            {props.children}
        </div>
    )
}

export default AppContent

export type AppContentProps = {
    children?: ReactNode
}
