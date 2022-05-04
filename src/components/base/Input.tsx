import { ExclamationCircleIcon } from '@heroicons/react/solid'

export type InputProps = {
    value?: string
    name?: string
    placeholder?: string
    autoComplete?: string
    type?: string
    error?: boolean
    disabled?: boolean
    onChange?: (newValue: string) => void
    ['data-testid']?: string
}

/**
 * A styled input component based on the html input
 */
const Input = (props: InputProps) => {
    const autoComplete = props.autoComplete || 'off'
    const type = props.type || 'text'

    const labelClasses =
        'ml-2 block text-sm font-medium mb-1 ' + (props.disabled ? 'text-primary-300' : 'text-primary-700')
    const inputClasses =
        'block w-full rounded-2xl border focus:outline-none focus:ring-1 transition py-2 pl-4 pr-10 ' +
        (props.disabled ? 'text-primary-300 placeholder-primary-300 ' : 'text-primary-900 placeholder-primary-400 ') +
        (props.error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-primary-300 focus:border-accent-500 focus:ring-accent-500')

    return (
        <div data-testid={props['data-testid'] || `input-${props.name || 'unknown'}`}>
            <label htmlFor={props.name} className={labelClasses} data-testid="label">
                {props.name}
            </label>
            <div className="relative">
                <input
                    value={props.value || ''}
                    onChange={event => props.onChange?.(event.target.value)}
                    name={props.name}
                    placeholder={props.placeholder}
                    type={type}
                    autoComplete={autoComplete}
                    disabled={props.disabled}
                    className={inputClasses}
                    data-testid="input"
                />
                {props.error && (
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                        data-testid="error-sign"
                    >
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Input
