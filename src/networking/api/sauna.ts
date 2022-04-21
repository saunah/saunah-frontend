import axios from 'axios'
import { Sauna } from '../../entities/Sauna'
import { Id } from '../../utils/identifiable'
import { mapInArray } from '../../utils/mapping'
import { DeepReadonly } from '../../utils/object'
import apiRoutes from '../apiRoutes'

export type SaunaAPI = DeepReadonly<{
    list(): Promise<Sauna.Response[]>
    get(saunaId: Id): Promise<Sauna.Response>
    add(sauna: Sauna.Request): Promise<Sauna.Response>
    edit(saunaId: Id, sauna: Sauna.Request): Promise<Sauna.Response>
    remove(saunaId: Id): Promise<void>
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
    async edit(saunaId: Id, sauna: Sauna.Request): Promise<Sauna.Response> {
        const remoteRequest = Sauna.mapOut(sauna)
        const response = await axios.post(apiRoutes.sauna.edit(saunaId), remoteRequest)
        return Sauna.mapIn(response.data)
    },
    async remove(saunaId: Id): Promise<void> {
        await axios.post(apiRoutes.sauna.remove(saunaId))
    },
}

export default saunaApi
