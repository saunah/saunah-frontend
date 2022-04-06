import { ReactNode, useState } from 'react'

export type InputFieldProps = {
    title?: string
    placeholder?: string
    type?: 'input' | 'password'
    color?: string
    disabled?: boolean
    children?: ReactNode
}

const InputField = (props: InputFieldProps) => {
    const color = props.color || 'gray'
    const classesForLabel = `block text-${color} text-sm font-bold mb-2`
    const classes =
        `shadow appearance-none border rounded w-full py-2 px-4 text-${color}-900` +
        (props.disabled ? `bg-${color}-100 cursor-default` : `bg-${color}-200 hover:bg-${color}-300`)
    const [value, setValue] = useState('')

    function handleChange(event: any) {
        setValue(event.target.value)
        console.log(event.target.value)
    }

    return (
        <div className="mb-4">
            <label className={classesForLabel}>{props.title}</label>
            <input
                className={classes}
                id="InputField"
                type={props.type || 'text'}
                placeholder={props.placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default InputField
