import axios from 'axios'
import { Greeting, GreetingResponse, mapInGreeting } from '../../entities/Greeting'
import { readonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

const greeting = {
    async getGreeting(name: string): Promise<Greeting> {
        const response = await axios.get(apiRoutes.greeting(name))
        return mapInGreeting(response.data as GreetingResponse)
    },
}

export default readonly(greeting)
