import { ReactNode } from 'react'

const AppContent = (props: AppContentProps) => {
    return <div className="container mx-auto max-w-screen-xl mt-28 mb-10">{props.children}</div>
}

export default AppContent

export type AppContentProps = {
    children?: ReactNode
}
