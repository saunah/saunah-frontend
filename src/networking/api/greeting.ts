import axios from 'axios'
import { Greeting, GreetingResponse, mapInGreeting } from '../../entities/Greeting'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type GreetingAPI = DeepReadonly<{
    get(name: string): Promise<Greeting>
    save(greeting: Greeting): Promise<Greeting>
}>

const greeting: GreetingAPI = {
    async get(name: string): Promise<Greeting> {
        const response = await axios.get(apiRoutes.greeting(name))
        return mapInGreeting(response.data as GreetingResponse)
    },
    async save(greeting: Greeting): Promise<Greeting> {
        return greeting
    },
}

export default greeting
