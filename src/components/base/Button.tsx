import { ReactNode } from 'react'

export type ButtonProps = {
    title?: string
    type?: 'button' | 'submit' | 'reset'
    color?: string
    disabled?: boolean
    onClick?: () => void
    children?: ReactNode
    ['data-testid']?: string
}

/**
 * A styled button component based on the html button.
 */
const Button = (props: ButtonProps) => {
    const color = props.color || 'accent'
    const classes =
        `py-2 px-4 text-sm font-medium rounded-md text-${color}-900 ` +
        (props.disabled ? `bg-${color}-100 cursor-default` : `bg-${color}-200 hover:bg-${color}-300`)

    return (
        <button
            className={classes}
            type={props.type || 'button'}
            onClick={props.onClick}
            disabled={props.disabled}
            data-testid="button"
        >
            {props.children || props.title}
        </button>
    )
}

export default Button
