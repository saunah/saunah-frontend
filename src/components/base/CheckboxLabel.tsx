import Checkbox, { CheckboxProps } from './Checkbox'

export type CheckboxLabelProps = CheckboxProps & {
    label?: string
    details?: string
    ['data-testid']?: string
}

/**
 * A CheckboxLabel consists of a checkbox with a label and a description.
 */
const CheckboxLabel = (props: CheckboxLabelProps) => {
    const toggle = () => {
        if (!props.disabled) props.onChange?.(!props.value)
    }

    const cursorClass = props.disabled ? '' : ' cursor-pointer'

    return (
        <div className="flex items-start" data-testid={props['data-testid'] || 'checkbox-label'}>
            <div className="mt-0.5">
                <Checkbox {...props} />
            </div>
            <div className="ml-3 text-sm select-none">
                <label
                    className={'font-medium text-primary-700' + cursorClass}
                    onClick={toggle}
                    data-testid="checkbox-label"
                >
                    {props.label}
                </label>
                <p className={'text-primary-500' + cursorClass} onClick={toggle} data-testid="checkbox-details">
                    {props.details}
                </p>
            </div>
        </div>
    )
}

export default CheckboxLabel
