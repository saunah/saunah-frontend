import { useState } from 'react'
import { Sauna } from '../entities/Sauna'
import api from '../networking/api'
import { Id, insert, removeId } from '../utils/identifiable'

export type SaunaState = {
    saunas: Sauna.Response[]
    fetchAll: () => Promise<void>
    fetch: (saunaId: Id) => Promise<void>
    save: (sauna: Sauna.Request) => Promise<void>
    remove: (saunaId: Id) => Promise<void>
}

export function useSauna(): SaunaState {
    const [saunas, setSaunas] = useState<Sauna.Response[]>([])
    const insertSauna = (newSauna: Sauna.Response) => setSaunas(insert(saunas, newSauna))

    const fetchAll = async () => setSaunas(await api.sauna.list())
    const fetch = async (saunaId: Id) => insertSauna(await api.sauna.get(saunaId))
    const save = async (sauna: Sauna.Request) => {
        if (sauna.id != null) insertSauna(await api.sauna.edit(sauna.id, sauna))
        else insertSauna(await api.sauna.add(sauna))
    }

    const remove = async (saunaId: Id) => {
        await api.sauna.remove(saunaId)
        setSaunas(removeId(saunas, saunaId))
    }

    return { saunas, fetchAll, fetch, save, remove }
}
