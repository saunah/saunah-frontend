import { ReactNode } from 'react'

const AppContent = (props: AppContentProps) => {
    return <div className="content">{props.children}</div>
}

export default AppContent

export type AppContentProps = {
    children?: ReactNode
}
