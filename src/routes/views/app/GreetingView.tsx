import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GreetingPrompt from '../../../components/GreetingPrompt'
import { Greeting } from '../../../entities/Greeting'
import api from '../../../networking/api'
import { routeParams } from '../../routes'

const GreetingView = () => {
    const [greeting, setGreeting] = useState<Greeting>()
    const params = useParams()

    useEffect(() => {
        const user = params[routeParams.user]
        if (user) api.greeting.getGreeting(user).then(newValue => setGreeting(newValue))
    }, [params])

    return <GreetingPrompt greeting={greeting} />
}

export default GreetingView
