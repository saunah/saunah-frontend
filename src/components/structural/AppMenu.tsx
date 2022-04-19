import { ReactNode } from 'react'

/**
 * This component provides the structure for a
 * navigation bar. Items can be passed as children.
 */
const AppMenu = (props: AppMenuProps) => {
    return (
        <div className="p-4 w-full fixed top-0 left-0">
            <div className="h-14 p-2 w-full bg-primary-100 rounded-3xl flex flex-col items-center justify-center shrink-0 shadow-xl shadow-primary-300">
                <nav className="space-x-4">{props.children}</nav>
            </div>
        </div>
    )
}

export default AppMenu

export type AppMenuProps = {
    children?: ReactNode
}
