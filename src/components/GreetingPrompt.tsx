import { Greeting } from '../entities/Greeting'

const GreetingPrompt = (props: { greeting?: Greeting }) => {
    return <p className="text-3xl font-semibold">{props.greeting?.content || 'Nobody is here.'}</p>
}

export default GreetingPrompt
