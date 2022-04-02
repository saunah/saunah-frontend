import { Greeting } from '../entities/Greeting'

const GreetingPrompt = (props: { greeting?: Greeting; onClick?: () => void }) => {
    return (
        <div>
            <p className="text-3xl font-semibold">{props.greeting?.content || 'Nobody is here.'}</p>
            <button className="p-2 bg-white rounded-md font-medium" onClick={props.onClick}>
                Click me!
            </button>
        </div>
    )
}

export default GreetingPrompt
