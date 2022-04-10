import Checkbox, { CheckboxProps } from './Checkbox'

export type CheckboxLabelProps = CheckboxProps & {
    label?: string
    details?: string
}

const CheckboxLabel = (props: CheckboxLabelProps) => {
    const toggle = () => {
        if (!props.disabled) props.onChange?.(!props.value)
    }

    const cursorClass = props.disabled ? '' : ' cursor-pointer'

    return (
        <div className="flex items-start">
            <div className="mt-0.5">
                <Checkbox {...props} />
            </div>
            <div className="ml-3 text-sm select-none">
                <label
                    className={'font-medium text-gray-700' + cursorClass}
                    onClick={toggle}
                    data-testid="checkbox-label"
                >
                    {props.label}
                </label>
                <p className={'text-gray-500' + cursorClass} onClick={toggle} data-testid="checkbox-details">
                    {props.details}
                </p>
            </div>
        </div>
    )
}

export default CheckboxLabel
