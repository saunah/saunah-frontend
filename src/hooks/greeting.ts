import { useCallback, useState } from 'react'
import { Greeting } from '../entities/Greeting'
import api from '../networking/api'

export type GreetingState = {
    greetings: Greeting[]
    fetch: (user: string) => Promise<void>
    greetingWithName: (name: string) => Greeting[]
    save(greeting: Greeting): Promise<void>
}

export function useGreeting(): GreetingState {
    const [greetings, setGreetings] = useState<Greeting[]>([])

    const fetch = async (user: string) => {
        const greeting = await api.greeting.get(user)
        setGreetings([...greetings, greeting])
    }

    const greetingWithName = useCallback(
        (name: string) => {
            return greetings.filter(greeting => greeting.name === name)
        },
        [greetings]
    )

    const save = async (greeting: Greeting) => {
        const newGreeting = await api.greeting.save(greeting)
        setGreetings([...greetings, newGreeting])
    }

    return { greetings, fetch, greetingWithName, save }
}
