import { useCallback, useState } from 'react'
import { Greeting } from '../entities/Greeting'
import api from '../networking/api'

export type GreetingState = {
    greetings: Greeting[]
    fetch: (user: string) => Promise<void>
    greetingWithId: (id: number) => Greeting[]
}

export function useGreeting(): GreetingState {
    const [greetings, setGreetings] = useState<Greeting[]>([])

    const fetch = async (user: string) => {
        const greeting = await api.greeting.getGreeting(user)
        setGreetings([...greetings, greeting])
    }

    const greetingWithId = useCallback(
        (id: number) => {
            return greetings.filter(greeting => greeting.id === id)
        },
        [greetings]
    )

    return { greetings, fetch, greetingWithId }
}
