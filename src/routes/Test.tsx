import { useEffect, useState } from 'react'
import GreetingPrompt from '../components/GreetingPrompt'
import { Greeting } from '../entities/Greeting'
import api from '../networking/api'

const Test = () => {
    const [greeting, setGreeting] = useState<Greeting>()

    useEffect(() => {
        api.greeting.getGreeting('Saunah').then(newValue => setGreeting(newValue))
    }, [])

    return <GreetingPrompt greeting={greeting} />
}

export default Test
