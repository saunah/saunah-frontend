import axios from 'axios'
import { Greeting } from '../../entities/Greeting'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type GreetingAPI = DeepReadonly<{
    get(name: string): Promise<Greeting.Data>
    save(greeting: Greeting.Edit): Promise<Greeting.Data>
}>

const greeting: GreetingAPI = {
    async get(name: string): Promise<Greeting.Data> {
        const response = await axios.get(apiRoutes.greeting(name))
        return Greeting.mapIn(response.data as Greeting.DataResponse)
    },
    async save(greeting: Greeting.Edit): Promise<Greeting.Data> {
        return Promise.reject()
    },
}

export default greeting
