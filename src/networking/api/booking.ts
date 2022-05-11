import { DeepReadonly } from '../../utils/object'
import { Price } from '../../entities/Price'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { mapInArray } from '../../utils/mapping'

export type BookingAPI = DeepReadonly<{
    list(): Promise<Price.Response[]>
    get(priceId: number): Promise<Price.Response>
    add(price: Price.Request): Promise<Price.Response>
    edit(priceId: number, price: Price.Request): Promise<Price.Response>
    remove(priceId: number): Promise<void>
}>
//IMPORTANT: this is a copy/paste class from price.ts, still needs a lot of changes!!!!
const bookingApi: BookingAPI = {
    async list(): Promise<Price.Response[]> {
        const response = await axios.get(apiRoutes.price.list)
        return mapInArray(response.data, Price.mapIn)
    },
    async get(priceId: number): Promise<Price.Response> {
        const response = await axios.get(apiRoutes.price.get(priceId))
        return Price.mapIn(response.data)
    },
    async add(price: Price.Request): Promise<Price.Response> {
        const remoteRequest = Price.mapOut(price)
        const response = await axios.post(apiRoutes.price.add, remoteRequest)
        return Price.mapIn(response.data)
    },
    async edit(priceId: number, price: Price.Request): Promise<Price.Response> {
        const remoteRequest = Price.mapOut(price)
        const response = await axios.put(apiRoutes.price.edit(priceId), remoteRequest)
        return Price.mapIn(response.data)
    },
    async remove(priceId: number): Promise<void> {
        await axios.delete(apiRoutes.price.remove(priceId))
    },
}

export default bookingApi
