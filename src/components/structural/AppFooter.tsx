import { ReactNode } from 'react'

/**
 * This component provides the structure for the
 * footer of the app.
 */
const AppFooter = (props: AppFooterProps) => {
    return <footer>{props.children}</footer>
}

export default AppFooter

export type AppFooterProps = {
    children: ReactNode
}
