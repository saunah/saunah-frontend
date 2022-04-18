import { ReactNode } from 'react'

/**
 * This component provides the structure for a
 * navigation bar. Items can be passed as children.
 */
const AppMenu = (props: AppMenuProps) => {
    return (
        <div className="space-x-4">
            <nav>{props.children}</nav>
        </div>
    )
}

export default AppMenu

export type AppMenuProps = {
    children?: ReactNode
}
