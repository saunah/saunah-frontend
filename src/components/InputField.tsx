const InputField = (props: { titel?: string; placeholder?: string }) => {
    return (
        <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">{props.titel}</label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="InputField"
                type="text"
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default InputField
