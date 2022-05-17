import { DeepReadonly } from '../../utils/object'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { mapInArray } from '../../utils/mapping'
import { Booking } from '../../entities/Booking'

export type BookingAPI = DeepReadonly<{
    listAll(): Promise<Booking.Response[]>
    list(): Promise<Booking.Response[]>
    get(bookingId: number): Promise<Booking.Response>
    add(booking: Booking.Request): Promise<Booking.Response>
    edit(bookingId: number, booking: Booking.Request): Promise<Booking.Response>
    approve(bookingId: number): Promise<void>
    cancel(bookingId: number): Promise<void>
}>

const bookingApi: BookingAPI = {
    async listAll(): Promise<Booking.Response[]> {
        const response = await axios.get(apiRoutes.booking.listAll)
        return mapInArray(response.data, Booking.mapIn)
    },
    async list(): Promise<Booking.Response[]> {
        const response = await axios.get(apiRoutes.booking.list)
        return mapInArray(response.data, Booking.mapIn)
    },
    async get(bookingId: number): Promise<Booking.Response> {
        const response = await axios.get(apiRoutes.booking.get(bookingId))
        return Booking.mapIn(response.data)
    },
    async add(booking: Booking.Request): Promise<Booking.Response> {
        const remoteRequest = Booking.mapOut(booking)
        const response = await axios.post(apiRoutes.booking.add, remoteRequest)
        return Booking.mapIn(response.data)
    },
    async edit(bookingId: number, booking: Booking.Request): Promise<Booking.Response> {
        const remoteRequest = Booking.mapOut(booking)
        const response = await axios.put(apiRoutes.booking.edit(bookingId), remoteRequest)
        return Booking.mapIn(response.data)
    },
    async approve(bookingId: number): Promise<void> {
        await axios.put(apiRoutes.booking.approve(bookingId))
    },
    async cancel(bookingId: number): Promise<void> {
        await axios.put(apiRoutes.booking.cancel(bookingId))
    },
}

export default bookingApi
