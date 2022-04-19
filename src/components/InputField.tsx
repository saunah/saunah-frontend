import { InputFieldType } from '../entities/InputFieldType'

export type InputFieldProperties = {
    values : InputFieldType
}

const InputField = (props: InputFieldProperties) => {
    const color = props.values.color || 'gray'
    const classesForLabel = `block text-${color} text-sm font-bold mb-2`
    const classes =
        `shadow appearance-none border rounded w-full py-2 px-4 text-${color}-900` +
        (props.values.disabled ? ` bg-${color}-100 cursor-default` : ` bg-${color}-200 hover:bg-${color}-300`)

    return (
        <div data-testid="divId" className="mb-4">
            <label data-testid = "labelTagId" className={classesForLabel}>{props.values.title}</label>
            <input
            data-testid = "inputTagId"
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
