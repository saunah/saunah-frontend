import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GreetingPrompt from '../../../components/example/GreetingPrompt'
import { useGreeting } from '../../../hooks/greeting'
import { routeParams } from '../../routes'

const GreetingView = () => {
    const { greetings, fetch } = useGreeting()
    const params = useParams()

    useEffect(() => {
        const user = params[routeParams.user] || 'unknown'
        fetch(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            Hallo
            <GreetingPrompt greeting={greetings[0]} />
        </div>
    )
}

export default GreetingView
