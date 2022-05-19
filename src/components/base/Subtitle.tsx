import { ReactNode } from 'react'

const Subtitle = (props: SubtitleProps) => {
    return (
        <h2 className={`text-primary-600 text-2xl font-semibold ${props.className}`} data-testid="page-subtitle">
            {props.children}
        </h2>
    )
}

export default Subtitle

export type SubtitleProps = {
    children?: ReactNode
    className?: string
}
