import { ReactNode } from 'react'

export type ButtonProps = {
    title?: string
    type?: 'button' | 'submit' | 'reset'
    color?: string
    disabled?: boolean
    onClick?: () => void
    link?: string
    children?: ReactNode
    ['data-testid']?: string
    className?: string
}

/**
 * A styled button component based on the html button.
 */
const Button = (props: ButtonProps) => {
    const color = props.color || 'accent'
    const classes =
        `${props.className} py-3 px-5 text-sm font-medium rounded-2xl shadow-lg shadow-primary-900/[0.1] ` +
        (props.disabled
            ? `text-${color}-900/[0.5] bg-${color}-100 cursor-default`
            : `text-${color}-900 bg-${color}-200 hover:bg-${color}-300`)

    return (
        <button
            className={classes}
            type={props.type || 'button'}
            onClick={props.onClick}
            disabled={props.disabled}
            data-testid={props['data-testid'] || 'button'}
        >
            {props.children || props.title}
        </button>
    )
}

export default Button
