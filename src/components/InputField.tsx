import { InputFieldType } from '../entities/InputFieldType'

export type InputFieldProps = {
    values : InputFieldType
}

const InputField = (props: InputFieldProps) => {
    const color = props.values.color || 'gray'
    const classesForLabel = `block text-${color} text-sm font-bold mb-2`
    const classes =
        `shadow appearance-none border rounded w-full py-2 px-4 text-${color}-900` +
        (props.values.disabled ? `bg-${color}-100 cursor-default` : `bg-${color}-200 hover:bg-${color}-300`)

    return (
        <div className="mb-4">
            <label className={classesForLabel}>{props.values.title}</label>
            <input
                className={classes}
                id="InputField"
                type={props.values.type || 'text'}
                placeholder={props.values.placeholder}
                value={props.values.value}
                onChange={event => props.values.onChange?.(event.target.value)}
            />
        </div>
    )
}

export default InputField
