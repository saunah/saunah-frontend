import { SVGProps } from 'react'

export type IconButtonProps = {
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
    color?: string
    size?: number
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: () => void
}

const IconButton = (props: IconButtonProps) => {
    const color = props.color || 'gray'
    const size = props.size || 5
    const type = props.type || 'button'

    const classes =
        'p-0.5 transition rounded-md -m-1 ' +
        (props.disabled
            ? `cursor-default text-${color}-300`
            : `cursor-pointer hover:bg-${color}-500 hover:bg-opacity-10 text-${color}-500`)

    return (
        <button
            disabled={props.disabled}
            className={classes}
            type={type}
            onClick={() => props.onClick?.()}
            data-testid="icon-button"
        >
            {props.icon && <props.icon className={`w-${size} h-${size}`} />}
        </button>
    )
}

export default IconButton
