import axios from 'axios'
import { Sauna } from '../../entities/Sauna'
import { mapInArray } from '../../utils/mapping'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type SaunaAPI = DeepReadonly<{
    list(): Promise<Sauna.Response[]>
    get(saunaId: number): Promise<Sauna.Response>
    add(sauna: Sauna.Request): Promise<Sauna.Response>
    edit(saunaId: number, sauna: Sauna.Request): Promise<Sauna.Response>
    remove(saunaId: number): Promise<void>
}>

const saunaApi: SaunaAPI = {
    async list(): Promise<Sauna.Response[]> {
        const response = await axios.get(apiRoutes.sauna.list)
        return mapInArray(response.data, Sauna.mapIn)
    },
    async get(saunaId: number): Promise<Sauna.Response> {
        const response = await axios.get(apiRoutes.sauna.get(saunaId))
        return Sauna.mapIn(response.data)
    },
    async add(sauna: Sauna.Request): Promise<Sauna.Response> {
        const remoteRequest = Sauna.mapOut(sauna)
        const response = await axios.post(apiRoutes.sauna.add, remoteRequest)
        return Sauna.mapIn(response.data)
    },
    async edit(saunaId: number, sauna: Sauna.Request): Promise<Sauna.Response> {
        const remoteRequest = Sauna.mapOut(sauna)
        const response = await axios.post(apiRoutes.sauna.edit, remoteRequest, { params: { Id: saunaId } })
        return Sauna.mapIn(response.data)
    },
    async remove(saunaId: number): Promise<void> {
        await axios.post(apiRoutes.sauna.remove, undefined, { params: { Id: saunaId } })
    },
}

export default saunaApi
