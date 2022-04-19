import { useCallback, useState } from 'react'
import { Greeting } from '../entities/Greeting'
import api from '../networking/api'

export type GreetingState = {
    greetings: Greeting.Data[]
    fetch: (user: string) => Promise<void>
    greetingWithId: (id: number) => Greeting.Data[]
    save(greeting: Greeting.Data): Promise<void>
}

export function useGreeting(): GreetingState {
    const [greetings, setGreetings] = useState<Greeting.Data[]>([])

    const fetch = async (user: string) => {
        const greeting = await api.greeting.get(user)
        setGreetings([...greetings, greeting])
    }

    const greetingWithId = useCallback(
        (id: number) => {
            return greetings.filter(greeting => greeting.id === id)
        },
        [greetings]
    )

    const save = async (greeting: Greeting.Edit) => {
        const newGreeting = await api.greeting.save(greeting)
        setGreetings([...greetings, newGreeting])
    }

    return { greetings, fetch, greetingWithId, save }
}
