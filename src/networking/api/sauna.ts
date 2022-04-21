import axios from 'axios'
import { Sauna } from '../../entities/Sauna'
import { mapInArray } from '../../utils/mapping'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type SaunaAPI = DeepReadonly<{
    list(): Promise<Sauna.Response[]>
    get(id: number): Promise<Sauna.Response>
    add(sauna: Sauna.Request): Promise<void>
    edit(sauna: Sauna.Request): Promise<void>
    remove(id: number): Promise<void>
}>

const saunaApi: SaunaAPI = {
    async list(): Promise<Sauna.Response[]> {
        const response = await axios.get(apiRoutes.sauna.list)
        return mapInArray(response.data, Sauna.mapIn)
    },
    async get(id: number): Promise<Sauna.Response> {
        const response = await axios.get(apiRoutes.sauna.get(id))
        return Sauna.mapIn(response.data)
    },
    async add(sauna: Sauna.Request): Promise<void> {
        const remoteRequest = Sauna.mapOut(sauna)
        await axios.post(apiRoutes.sauna.add, remoteRequest)
    },
    async edit(sauna: Sauna.Request): Promise<void> {
        const remoteRequest = Sauna.mapOut(sauna)
        // TODO: Use id of sauna when available
        await axios.post(apiRoutes.sauna.edit(1), remoteRequest)
    },
    async remove(id: number): Promise<void> {
        await axios.post(apiRoutes.sauna.remove(id))
    },
}

export default saunaApi
