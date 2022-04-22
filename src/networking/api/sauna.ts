import axios from 'axios'
import { Sauna } from '../../entities/Sauna'
import { mapInArray } from '../../utils/mapping'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type SaunaAPI = DeepReadonly<{
    list(): Promise<Sauna.Response[]>
    get(saunaId: number): Promise<Sauna.Response>
    add(sauna: Sauna.Request): Promise<void>
    edit(saunaId: number, sauna: Sauna.Request): Promise<void>
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
    async add(sauna: Sauna.Request): Promise<void> {
        const remoteRequest = Sauna.mapOut(sauna)
        await axios.post(apiRoutes.sauna.add, remoteRequest)
    },
    async edit(saunaId: number, sauna: Sauna.Request): Promise<void> {
        const remoteRequest = Sauna.mapOut(sauna)
        await axios.post(apiRoutes.sauna.edit(saunaId), remoteRequest)
    },
    async remove(saunaId: number): Promise<void> {
        await axios.post(apiRoutes.sauna.remove(saunaId))
    },
}

export default saunaApi
