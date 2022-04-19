import { ReactNode } from 'react'

export type ButtonProps = {
    title?: string
    type?: 'button' | 'submit' | 'reset'
    color?: string
    disabled?: boolean
    onClick?: () => void
    children?: ReactNode
}

const Button = (props: ButtonProps) => {
    const color = props.color || 'gray'
    const classes =
        `py-2 px-4 text-sm font-medium rounded-md text-${color}-900 ` +
        (props.disabled ? `bg-${color}-100 cursor-default` : `bg-${color}-200 hover:bg-${color}-300`)

    return (
        <div>
            <button className={classes} data-testid='mainButton' type={props.type || 'button'} onClick={props.onClick}>
                {/* We display the children <Button> children </Button>, if no exist we display the title.*/}
                {props.children || props.title}
            </button>
        </div>
    )
}

export default Button