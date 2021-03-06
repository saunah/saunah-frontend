import { ReactNode } from 'react'

/**
 * This component provides the structure for the
 * footer of the app.
 */
const AppFooter = (props: AppFooterProps) => {
    return (
        <footer className="p-4 w-full bg-primary-100 rounded-3xl" data-testid="app-footer">
            <div className="container w-full mx-auto max-w-screen-xl p-2 flex flex-row flex-1 items-center justify-center">
                <div className="basis-0 grow text-center">{props.children}</div>
            </div>
        </footer>
    )
}

export default AppFooter

export type AppFooterProps = {
    children?: ReactNode
}
