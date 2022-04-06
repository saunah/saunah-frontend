import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GreetingPrompt from '../../../components/example/GreetingPrompt'
import { useGreeting } from '../../../hooks/greeting'

const GreetingView = () => {
    const { greetings, fetch } = useGreeting()
    const params = useParams()

    useEffect(() => {
        const user = params['greetingId'] || 'unknown'
        fetch(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <GreetingPrompt greeting={greetings[0]} />
}

export default GreetingView
