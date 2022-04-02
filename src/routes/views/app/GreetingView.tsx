import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GreetingPrompt from '../../../components/example/GreetingPrompt'
import { useGreeting } from '../../../hooks/greeting'
import { routeParams } from '../../routes'

const GreetingView = () => {
    const { greetingWithId, fetch } = useGreeting()
    const params = useParams()

    const id = Number.parseInt(params[routeParams.user] || '0')

    useEffect(() => {
        const user = params[routeParams.user] || 'unknown'
        fetch(user)
    }, [params])

    return (
        <div>
            {id}
            <GreetingPrompt greeting={greetingWithId(id)[0]} />
        </div>
    )
}

export default GreetingView
