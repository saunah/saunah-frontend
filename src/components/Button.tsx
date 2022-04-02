const Button = (props: { input?: string }) => {
    return (
        <div>
            <button
                className="bg-amber-100 hover:text-gray-500 text-amber-500 font-bold py-2 px-4 rounded"
                type="button"
            >
                <p>{props.input}</p>
            </button>
        </div>
    )
}

export default Button
