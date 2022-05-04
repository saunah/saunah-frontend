import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type ButtonLinkProps = {
    to: string
    color?: string
    ['data-testid']?: string
    children?: ReactNode
    className?: string
}

/**
 * A styled button component based on the html button.
 */
const ButtonLink = (props: ButtonLinkProps) => {
    const color = props.color || 'accent'
    const classes = `inline-block py-3 px-5 text-sm font-medium rounded-2xl text-${color}-900 shadow-lg shadow-primary-900/[0.1] bg-${color}-200 hover:bg-${color}-300 ${props.className}`

    return (
        <Link className={classes} to={props.to}>
            {props.children}
        </Link>
    )
}

export default ButtonLink
