import { ReactNode } from 'react'

export type InputFieldProps = {
    title?: string
    placeholder?: string
    type?: 'input' | 'password'
    color?: string
    disabled?: boolean
    children?: ReactNode
    value?: string
    onChange?: (newValue: string) => void
}

const InputField = (props: InputFieldProps) => {
    const color = props.color || 'gray'
    const classesForLabel = `block text-${color} text-sm font-bold mb-2`
    const classes =
        `shadow appearance-none border rounded w-full py-2 px-4 text-${color}-900` +
        (props.disabled ? `bg-${color}-100 cursor-default` : `bg-${color}-200 hover:bg-${color}-300`)

    return (
        <div className="mb-4">
            <label className={classesForLabel}>{props.title}</label>
            <input
                className={classes}
                id="InputField"
                type={props.type || 'text'}
                placeholder={props.placeholder}
                value={props.value}
                onChange={event => props.onChange?.(event.target.value)}
            />
        </div>
    )
}

export default InputField
