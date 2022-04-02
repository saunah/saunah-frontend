const InputFieldPassword = (props: { titel?: string; placeholder?: string }) => {
    return (
        <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2">{props.titel}</label>
            <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                id="password"
                type="password"
                placeholder={props.placeholder}
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
        </div>
    )
}

export default InputFieldPassword
