import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GreetingPrompt from '../../../components/example/GreetingPrompt'
import { useGreeting } from '../../../hooks/greeting'
import { useAlert } from '../../alert/AlertProvider'

const GreetingView = () => {
    const { greetings, fetch } = useGreeting()
    const params = useParams()

    useEffect(() => {
        const user = params['greetingId'] || 'unknown'
        fetch(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { success } = useAlert()

    return <GreetingPrompt greeting={greetings[0]} onClick={() => success('Sehr nicely done!')} />
}

export default GreetingView
