import axios from 'axios'
import { Sauna } from '../../entities/Sauna'
import { findId } from '../../utils/identifiable'
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
        // const response = await axios.get(apiRoutes.sauna.list)
        return new Promise(r => setTimeout(() => r(saunas), 2000)) //mapInArray(response.data, Sauna.mapIn)
    },
    async get(saunaId: number): Promise<Sauna.Response> {
        //const response = await axios.get(apiRoutes.sauna.get(saunaId))
        return new Promise(r => setTimeout(() => r(findId(saunas, saunaId)!), 3000)) //Sauna.mapIn(response.data)
    },
    async add(sauna: Sauna.Request): Promise<Sauna.Response> {
        const remoteRequest = Sauna.mapOut(sauna)
        const response = await axios.post(apiRoutes.sauna.add, remoteRequest)
        return Sauna.mapIn(response.data)
    },
    async edit(saunaId: number, sauna: Sauna.Request): Promise<Sauna.Response> {
        const remoteRequest = Sauna.mapOut(sauna)
        const response = await axios.post(apiRoutes.sauna.edit(saunaId), remoteRequest)
        return Sauna.mapIn(response.data)
    },
    async remove(saunaId: number): Promise<void> {
        await axios.post(apiRoutes.sauna.remove(saunaId))
    },
}

export default saunaApi

const sauna1: Sauna.Response = {
    id: 1,
    name: 'Sauna 1',
    description: 'Das ist Sauna 1.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const sauna2: Sauna.Response = {
    id: 2,
    name: 'Sauna 2',
    description: 'Das ist Sauna 2.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const sauna3: Sauna.Response = {
    id: 3,
    name: 'Sauna 3',
    description: 'Das ist Sauna 3.',
    price: 100000,
    maxTemp: 100,
    numberOfPeople: 10,
    street: 'Hinterstrasse 12',
    zip: '8400',
    location: 'Winterthur',
    type: 'Zeltsauna',
    mobile: false,
}

const saunas = [sauna1, sauna2, sauna3]
