import { useCallback, useState } from 'react'
import { Greeting } from '../entities/Greeting'
import api from '../networking/api'
import { GreetingAPI } from '../networking/api/greeting'

export type GreetingState = {
    greetings: Greeting[]
    fetch: (user: string) => Promise<void>
    greetingWithId: (id: number) => Greeting[]
    save(greeting: Greeting): Promise<void>
}

export function useGreeting(greetingApi: GreetingAPI = api.greeting): GreetingState {
    const [greetings, setGreetings] = useState<Greeting[]>([])

    const fetch = async (user: string) => {
        const greeting = await greetingApi.get(user)
        setGreetings([...greetings, greeting])
    }

    const greetingWithId = useCallback(
        (id: number) => {
            return greetings.filter(greeting => greeting.id === id)
        },
        [greetings]
    )

    const save = async (greeting: Greeting) => {
        const newGreeting = await greetingApi.save(greeting)
        setGreetings([...greetings, newGreeting])
    }

    return { greetings, fetch, greetingWithId, save }
}
