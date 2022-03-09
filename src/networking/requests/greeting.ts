import axios from 'axios'
import { Greeting, GreetingResponse, mapInGreeting } from '../../entities/Greeting'
import { readonly } from '../../utils/object'
import routes from '../routes'

const greeting = {
    async getGreeting(name: string): Promise<Greeting> {
        const response = await axios.get(routes.greeting(name))
        return mapInGreeting(response.data as GreetingResponse)
    },
}

export default readonly(greeting)
