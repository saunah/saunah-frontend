export type SelectProps<T> = {
    values: T[]
    selected: T
    name?: string
    disabled?: boolean
    onChange: (newValue: T) => void
    ['data-testid']?: string
}

/**
 * A styled input component based on the html input
 */
function Select<T>(props: SelectProps<T>) {
    const labelClasses = 'ml-2 block text-sm font-medium mb-1'

    const selectClasses =
        'form-select appearance-none block w-full rounded-2xl border focus:outline-none focus:ring-1 focus:border-accent-500 focus:ring-accent-500 transition py-2 pl-4 pr-10 border-primary-300 ' +
        (props.disabled ? 'text-primary-300 placeholder-primary-300 ' : 'text-primary-900 placeholder-primary-400 ')

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const stringValue = event.target.value
        const newValue = props.values.find(value => '' + value === stringValue)
        if (newValue) props.onChange?.(newValue)
    }

    return (
        <div data-testid={props['data-testid'] || `input-${props.name || 'unknown'}`}>
            <label htmlFor={props.name} className={labelClasses} data-testid="label">
                {props.name}
            </label>
            <div className="relative">
                <select
                    onChange={handleChange}
                    className={selectClasses}
                    value={'' + props.selected}
                    disabled={props.disabled}
                    name={props.name}
                    data-testid="select"
                >
                    {props.values.map((value, valueIdx) => (
                        <option value={'' + value} key={valueIdx}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Select
