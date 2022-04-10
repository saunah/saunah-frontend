import { CheckIcon } from '@heroicons/react/solid'
import React from 'react'
import './Checkbox.css'

export type CheckboxProps = {
    value?: boolean
    color?: string
    disabled?: boolean
    onChange?: (newValue: boolean) => void
}

const Checkbox = (props: CheckboxProps) => {
    // TODO: Change to primary color
    const color = props.color || 'blue'

    const sharedClasses = (props.disabled ? 'cursor-default' : 'cursor-pointer') + ' h-5 w-5 rounded '
    const checkboxClasses =
        sharedClasses +
        'border ' +
        (props.value
            ? props.disabled
                ? `bg-${color}-300 border-${color}-300`
                : `bg-${color}-500 border-${color}-500`
            : ' border-gray-300 ' + (props.disabled ? 'bg-gray-200' : 'bg-white'))

    return (
        <div className="inline-block">
            <div
                className={'relative ' + sharedClasses}
                onClick={() => !props.disabled && props.onChange?.(!props.value)}
            >
                <input
                    type="checkbox"
                    className={checkboxClasses}
                    checked={props.value}
                    disabled={props.disabled}
                    onChange={() => props.onChange?.(!props.value)}
                />
                {props.value && <CheckIcon className="absolute top-0.5 left-0.5 h-4 w-4 text-white" />}
            </div>
        </div>
    )
}

export default Checkbox
